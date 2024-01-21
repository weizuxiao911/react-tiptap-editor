import { Extension, posToDOMRect } from "@tiptap/core"
import { MouseEmitter, MouseEvents } from '../plugins/mouse-emitter'
import { MousePlugin } from "../plugins/mouse-plugin"
import tippy, { Instance } from "tippy.js"
import { ReactRenderer } from "@tiptap/react"

const floatingOnTippy = (coords: { clientX: number, clientY: number }, content: ReactRenderer) => {
    if (!content || !content?.element) return false
    const box = content?.element?.getBoundingClientRect()
    return coords.clientX >= box.left &&
        coords.clientX <= box.right &&
        coords.clientY >= box.top &&
        coords.clientY <= box.bottom
}

/** build */
const tooltip = (t: any, pmViewDesc: any) => {
    const content = new ReactRenderer(t.options?.component, {
        editor: t.editor,
        props: {
            editor: t.editor,
            pmViewDesc
        }
    })
    if (!content || !content?.element) return
    t.options.content = content
    t.options?.tippy?.setContent(content?.element)
    t.options?.tippy?.setProps({
        getReferenceClientRect: () => {
            return posToDOMRect(t.editor.view, pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)
        }
    })
}

export type TooltipProps = {
    /** trigger */
    trigger: string | string[],
    /** react component */
    component: ((props?: MouseEvents['hover']) => React.JSX.Element) | null
    /** delay to show or hide  */
    delay: number
    /** ignore */
    content: ReactRenderer | null
    /** ignore */
    tippy: Instance | null
    /** ignore */
    emitter: MouseEmitter | null
    debounce: any | null
}

/** 
 * show on hover
 */
export const Tooltip = Extension.create<TooltipProps>({

    name: 'tooltip',

    onBeforeCreate() {
        !this.options?.emitter && (this.options.emitter = new MouseEmitter({
            editor: this.editor,
            options: {
                callback: (props: MouseEvents['hover']) => {
                    if (!this.editor?.isEditable || !this.options?.component || !this.options?.trigger) return
                    const { coords, pmViewDesc } = props
                    // debounce
                    this.options?.debounce && clearTimeout(this.options?.debounce)
                    this.options.debounce = setTimeout(() => {
                        // if floating on tippy to keeps show
                        if (this.options?.content && floatingOnTippy(coords, this.options?.content)) return
                        this.options.content = null
                        this.options?.tippy?.hide()
                        if (!(pmViewDesc?.node?.marks?.length && pmViewDesc?.node?.marks?.filter((mark: any) => {
                            if (typeof this.options?.trigger === 'string') {
                                return mark?.type?.name === this.options?.trigger
                            }
                            return this.options?.trigger?.filter((t: any) => t === mark?.type?.name).length
                        })).length) {
                            return
                        }
                        tooltip(this, pmViewDesc)
                        this.options?.tippy?.show()
                    }, 300)
                },
                delay: this.options?.delay ?? 200,
                paused: false,
                ignoreEmpty: true,
                ignoreSelection: false,
                ignoreDocument: false,
                ignoreHistory: false,
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
    },

    onDestroy() {
        this.options?.emitter?.destroy()
        this.options.emitter = null
    },

    addOptions() {
        return {
            trigger: 'link',
            component: null,
            delay: 200,
            content: null,
            tippy: null,
            emitter: null,
            debounce: null,
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