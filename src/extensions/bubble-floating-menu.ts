import { Editor, Extension, posToDOMRect } from "@tiptap/core"
import { MouseEmitter, MouseEvents } from '../plugins/mouse-emitter'
import { MousePlugin } from "../plugins/mouse-plugin"
import tippy, { Instance } from "tippy.js"
import { ReactRenderer } from "@tiptap/react"

/** build bubble menu */
const bubble = (b: any, from: number, to: number) => {
    const content = new ReactRenderer(b.options?.bubble, {
        editor: b.editor,
        props: {
            editor: b.editor,
            from,
            to
        }
    })
    if (!content || !content?.element) return
    b.options?.tippy1?.setContent(content?.element)
    b.options?.tippy1?.setProps({
        getReferenceClientRect: () => {
            return posToDOMRect(b.editor.view, from, to)
        }
    })
}

/** build bubble menu */
const floating = (f: any, pmViewDesc: any) => {
    const content = new ReactRenderer(f.options?.floating, {
        editor: f.editor,
        props: {
            editor: f.editor,
            pmViewDesc
        }
    })
    if (!content || !content?.element) return
    f.options?.tippy2?.setContent(content?.element)
    f.options?.tippy2?.setProps({
        getReferenceClientRect: () => {
            return posToDOMRect(f.editor.view, pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)
        }
    })
}

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        bubbleFloatingMenu: {
            /**
             * show if `tippy1` exsit
             * @returns alawys `true`
             */
            showBubbleMenu: () => ReturnType
            /**
             * hide if `tippy1` exsit
             * @returns alawys `true`
             */
            hideBubbleMenu: () => ReturnType
            /**
             * show if `tippy2` exsit
             * @returns  alawys `true`
             */
            showFloatingMenu: () => ReturnType
            /**
             * hide if `tippy2` exsit
             * @returns  alawys `true`
             */
            hideFloatingMenu: () => ReturnType
        }
    }
}

export type BubbleFloatingMenuProps = {

    /**
     * bubble menu component
     */
    bubble: (({ editor, from, to }: { editor: Editor; from: number; to: number }) => React.JSX.Element) | null
    
    /**
     * floating menu component
     */
    floating: (({ editor, pmViewDesc }: { editor: Editor; pmViewDesc: any }) => React.JSX.Element) | null

    /**
     * ignore this
     */
    tippy1: Instance | null
    /**
     * ignore this
     */
    tippy2: Instance | null
    /**
     * ignore this
     */
    delay: number
    /**
     * ignore this
     */
    debounce: any | null
    /**
     * ignore this
     */
    emitter: MouseEmitter | null
}

/**
 * show bubble-menu on selection 
 * show floating-menu on hover
 */
export const BubbleFloatingMenu = Extension.create<BubbleFloatingMenuProps>({

    name: 'bubbleFloatingMenu',

    onBeforeCreate() {
        !this.options?.emitter && (this.options.emitter = new MouseEmitter({
            editor: this.editor,
            options: {
                callback: (props: MouseEvents['hover']) => {
                    if (!this.editor?.isEditable || !this.options?.floating) return
                    let pmViewDesc = props?.pmViewDesc
                    const selection = this.editor?.view?.state?.selection
                    if (selection) {
                        const { empty, from, to } = selection
                        if (!empty && from !== to) {
                            this.editor?.chain()?.showBubbleMenu()?.run()
                            return
                        }
                    }
                    // find NodeViewDesc, not TextViewDesc / MaskViewDesc
                    while (pmViewDesc && (!pmViewDesc?.node || 'text' === pmViewDesc?.node?.type?.name)) {
                        pmViewDesc = pmViewDesc?.parent
                    }
                    floating(this, pmViewDesc)
                    this.editor?.chain().showFloatingMenu()
                },
                paused: false,
                ignoreEmpty: true,
                ignoreSelection: true,
                ignoreDocument: true,
                ignoreHistory: true,
            }
        }))
    },

    onCreate() {
        !this.options?.tippy1 && (
            this.options.tippy1 = tippy(this.editor?.view?.dom, {
                getReferenceClientRect: null,
                appendTo: document.body,
                hideOnClick: true,
                interactive: true,
                trigger: "manual",
                placement: 'top',
                maxWidth: "none"
            })
        )
        !this.options?.tippy2 && (
            this.options.tippy2 = tippy(this.editor?.view?.dom, {
                getReferenceClientRect: null,
                appendTo: document.body,
                hideOnClick: true,
                interactive: true,
                trigger: "manual",
                placement: 'left',
                maxWidth: "none"
            })
        )
    },

    onTransaction() {
        if (!this.editor?.isFocused || !this.editor?.isEditable || !this.options?.bubble) return
        const selection = this.editor?.view?.state?.selection
        const { empty, from, to } = selection
        if (empty || from === to) {
            this.options?.tippy1?.hide() // don't use command, otherwise will causes stack‘s error
            this.options?.tippy2?.hide() // hide floating-menu on editing state
            return
        }
        // to render component for updating state
        bubble(this, from, to)
    },

    onSelectionUpdate() {
        // debounce
        if (this.options?.debounce) {
            clearTimeout(this.options?.debounce)
        }
        // show bubble menu
        this.options.debounce = setTimeout(() => {
            if (!this.editor?.isFocused || !this.editor?.isEditable || !this.options?.bubble) return
            const selection = this.editor?.view?.state?.selection
            const { empty, from, to } = selection
            if (empty || from === to) {
                return
            }
            bubble(this, from, to)
            this.editor?.chain()?.hideFloatingMenu()?.showBubbleMenu()?.run()
        }, this.options?.delay ?? 100)
    },

    onDestroy() {
        this.options?.tippy1?.destroy()
        this.options?.tippy2?.destroy()
        this.options?.emitter?.destroy()
        this.options?.debounce && (clearTimeout(this.options?.debounce))
        this.options.tippy1 = null
        this.options.tippy2 = null
        this.options.emitter = null
        this.options.debounce = null
    },

    addOptions() {
        return {
            bubble: null,
            floating: null,
            tippy1: null,
            tippy2: null,
            delay: 100,
            debounce: null,
            emitter: null,
        }
    },

    addCommands() {
        return {
            showBubbleMenu: () => () => {
                this.options?.tippy1?.show()
                return true
            },
            hideBubbleMenu: () => () => {
                this.options?.tippy1?.hide()
                return true
            },
            showFloatingMenu: () => () => {
                this.options?.tippy2?.show()
                return true
            },
            hideFloatingMenu: () => () => {
                this.options?.tippy2?.hide()
                return true
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            MousePlugin({
                ...this.options
            })
        ]
    },

})