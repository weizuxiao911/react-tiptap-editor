import { EventEmitter } from "./event-emitter"
import { Editor } from "@tiptap/core"
import { EditorView } from "@tiptap/pm/view"
import { EditorState } from "@tiptap/pm/state"

export interface MouseEvents {

    hover: {
        editor: Editor,
        view: EditorView,
        coords: {
            clientX: number,
            clientY: number
        },
        pos: number,
        inside: number,
        pmViewDesc: any,
        offset: number,
        posAtStart: number,
        posAtEnd: number,
    }
}

export class MouseEmitter extends EventEmitter<MouseEvents> {

    private editor: Editor
    private paused: boolean = false
    private ignoreEmpty: boolean = true
    private ignoreSelection: boolean = false
    private ignoreDocument: boolean = true
    private ignoreHistory: boolean = false

    private callback: (props: MouseEvents['hover']) => void

    private debounce: any | null
    private delay: number = 100
    private lastPosStart: number | null = null
    private lastPosEnd: number | null = null

    constructor({ editor, options }: { editor: Editor; options: { [key: string]: any } }) {
        super()
        this.editor = editor
        undefined !== options?.paused && (this.paused = options?.paused)
        undefined !== options?.ignoreEmpty && (this.ignoreEmpty = options?.ignoreEmpty)
        undefined !== options?.ignoreSelection && (this.ignoreSelection = options?.ignoreSelection)
        undefined !== options?.ignoreDocument && (this.ignoreDocument = options?.ignoreDocument)
        undefined !== options?.ignoreHistory && (this.ignoreHistory = options?.ignoreHistory)
        this.callback = options.callback
        this.on('hover', this.callback)
    }

    update(view: EditorView, prevState: EditorState) {
        this.debounce && clearTimeout(this.debounce)
        if (!this.editor?.isFocused) {
            this.reset()
        }
    }

    destroy() {
        this.debounce && clearTimeout(this.debounce)
        this.off('hover', this.callback)
    }

    move(view: EditorView, event: MouseEvent): boolean | void {
        if (this?.paused) return
        // 防抖处理
        this.debounce && clearTimeout(this.debounce)
        this.debounce = setTimeout(() => {
            if (this.editor.isEmpty && !this?.ignoreEmpty) {
                this.reset()
                return
            }
            const selection = view?.state?.selection
            if (selection) {
                const { empty, from, to } = selection
                if (!empty && from !== to && !this?.ignoreSelection) {
                    this.reset()
                    return
                }
            }
            const posAtCoords = view?.posAtCoords({
                left: event?.clientX,
                top: event?.clientY
            })
            if (!posAtCoords) {
                this.reset()
                return
            }
            const { pos, inside } = posAtCoords
            const domAtPos = view?.domAtPos(pos, inside)
            const { node, offset } = domAtPos
            let current = node
            if (!current) {
                this.reset()
                return
            }
            while (!current?.pmViewDesc && current?.parentElement) { // find pmViewDesc
                current = current?.parentElement
                if (current?.pmViewDesc) break
            }
            if (!current || !current?.pmViewDesc) {
                this.reset()
                return 
            }
            let pmViewDesc = current?.pmViewDesc
            if (this.ignoreDocument && !pmViewDesc?.parent) {
                this.reset()
                return 
            }
            const { posAtStart, posAtEnd, } = pmViewDesc
            if (this.lastPosStart
                && this.lastPosEnd
                && posAtStart === this.lastPosStart
                && posAtEnd === this.lastPosEnd) {
                return 
            }
            if (!this.ignoreHistory) {
                this.lastPosStart = posAtStart
                this.lastPosEnd = posAtEnd
            }
            this?.emit('hover', {
                editor: this.editor,
                view,
                coords: event,
                pos,
                inside,
                pmViewDesc: pmViewDesc,
                offset,
                posAtStart,
                posAtEnd,
            })
        }, this.delay)
    }

    toPause(): void {
        this.paused = true
    }

    toContinue(): void {
        this.paused = false
    }

    onPaused(): boolean {
        return this.paused
    }

    private reset(): void {
        this.lastPosStart = null
        this.lastPosEnd = null
    }

}