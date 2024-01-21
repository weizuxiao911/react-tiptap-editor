import { Editor, Extension, posToDOMRect } from "@tiptap/core"
import { MouseEmitter, MouseEvents } from '../plugins/mouse-emitter'
import { MousePlugin } from "../plugins/mouse-plugin"
import tippy, { Instance } from "tippy.js"
import { ReactRenderer } from "@tiptap/react"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        bubbleMenu: {
            showBubbleMenu: () => ReturnType
            hideBubbleMenu: () => ReturnType
            showPopoverMenu: () => ReturnType
            hidePopoverMenu: () => ReturnType
        }
    }
}

export type BubbleMenuProps = {

    menu: (({ editor, from, to }: { editor: Editor; from: number; to: number }) => React.JSX.Element) | null

    pops: (({ editor, pmViewDesc }: { editor: Editor; pmViewDesc: any }) => React.JSX.Element) | null

    tippy: Instance | null
    popover: Instance | null

    delay: number
    debounce: any | null
    emitter: MouseEmitter | null
}

const bubble = (bubble: any, from: number, to: number) => {
    const content = new ReactRenderer(bubble.options?.menu, {
        editor: bubble.editor,
        props: {
            editor: bubble.editor,
            from,
            to
        }
    })
    if (!content || !content?.element) return
    bubble.options?.tippy?.setContent(content?.element)
    bubble.options?.tippy?.setProps({
        getReferenceClientRect: () => {
            return posToDOMRect(bubble.editor.view, from, to)
        }
    })
}

const popover = (popover: any, pmViewDesc: any) => {
    const content = new ReactRenderer(popover.options?.pops, {
        editor: popover.editor,
        props: {
            editor: popover.editor,
            pmViewDesc
        }
    })
    if (!content || !content?.element) return
    popover.options?.popover?.setContent(content?.element)
    popover.options?.popover?.setProps({
        getReferenceClientRect: () => {
            return posToDOMRect(popover.editor.view, pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)
        }
    })
}



export const BubbleMenu = Extension.create<BubbleMenuProps>({

    name: 'bubbleMenu',

    onBeforeCreate() {
        !this.options?.emitter && (this.options.emitter = new MouseEmitter({
            editor: this.editor,
            options: {
                callback: (props: MouseEvents['hover']) => {
                    if (!this.editor?.isEditable || !this.options?.pops) return
                    let pmViewDesc = props?.pmViewDesc
                    const selection = this.editor?.view?.state?.selection
                    if (selection) {
                        const { empty, from, to } = selection
                        if (!empty && from !== to) {
                            console.log(from, to)
                            this.editor?.chain()?.showBubbleMenu()?.run()
                            return
                        }
                    }
                    while (pmViewDesc && (!pmViewDesc?.node || 'text' === pmViewDesc?.node?.type?.name)) {
                        pmViewDesc = pmViewDesc?.parent
                    }
                    popover(this, pmViewDesc)
                    this.editor?.chain().showPopoverMenu()
                },
                paused: false,
                ignoreEmpty: false,
                ignoreSelection: true,
                ignoreDocument: true,
                ignoreHistory: true,
            }
        }))
    },

    onCreate() {
        !this.options?.tippy && (
            this.options.tippy = tippy(this.editor?.view?.dom, {
                getReferenceClientRect: null,
                appendTo: document.body,
                hideOnClick: true,
                interactive: true,
                trigger: "manual",
                placement: 'top',
                maxWidth: "none"
            })
        )
        !this.options?.popover && (
            this.options.popover = tippy(this.editor?.view?.dom, {
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

    onTransaction(props) {
        if (!this.editor?.isFocused || !this.editor?.isEditable || !this.options?.menu) return
        const selection = this.editor?.view?.state?.selection
        const { empty, from, to } = selection
        if (empty || from === to) {
            this.options?.tippy?.hide() // 不能使用commands操作，否则会造成死循环
            this.options?.popover?.hide()
            return
        }
        bubble(this, from, to)
    },

    onSelectionUpdate() {
        if (this.options?.debounce) {
            clearTimeout(this.options?.debounce)
        }
        this.options.debounce = setTimeout(() => {
            if (!this.editor?.isFocused || !this.editor?.isEditable || !this.options?.menu) return
            const selection = this.editor?.view?.state?.selection
            const { empty, from, to } = selection
            if (empty || from === to) {
                return
            }
            bubble(this, from, to)
            this.editor?.chain()?.hidePopoverMenu()?.showBubbleMenu()?.run()
        }, this.options?.delay ?? 100)
    },

    onDestroy() {
        this.options?.emitter?.destroy()
    },

    addOptions() {
        return {
            menu: null,
            tippy: null,

            pops: null,
            popover: null,

            delay: 100,
            debounce: null,
            emitter: null,
        }
    },

    addCommands() {
        return {
            showBubbleMenu: () => () => {
                this.options?.tippy?.show()
                return true
            },
            hideBubbleMenu: () => () => {
                this.options?.tippy?.hide()
                return true
            },
            showPopoverMenu: () => () => {
                this.options?.popover?.show()
                return true
            },
            hidePopoverMenu: () => () => {
                this.options?.popover?.hide()
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