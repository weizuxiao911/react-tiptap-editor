import { Extension } from "@tiptap/core"
import { MouseEmitter, MouseEvents } from '../plugins/mouse-emitter'
import { MousePlugin } from "../plugins/mouse-plugin"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mouseCoords: {
            pauseMouseCoordsListen: () => ReturnType
            continueMouseCoordsListen: () => ReturnType
            isPausedMouseCoordsListen: () => ReturnType
        }
    }
}

export type MouseCoordsProps = {
    callback: (props: MouseEvents['hover']) => void,
    paused: boolean
    ignoreSelection: boolean
    ignoreDocument: boolean
    emitter: MouseEmitter | null
}

export const MouseCoords = Extension.create<MouseCoordsProps>({

    name: 'mouseCoords',

    onBeforeCreate() {
        !this.options?.emitter && (this.options.emitter = new MouseEmitter({
            editor: this.editor,
            options: this.options
        }))
    },

    onDestroy() {
        this.options?.emitter?.destroy()
    },

    addOptions() {
        return {
            callback: () => { },
            paused: false,
            ignoreSelection: false,
            ignoreDocument: true,
            emitter: null,
        }
    },

    addCommands() {
        return {
            pauseMouseCoordsListen: () => () => {
                this.options?.emitter?.toPause()
                return true
            },
            continueMouseCoordsListen: () => () => {
                this.options?.emitter?.toContinue()
                return true
            },
            isPausedMouseCoordsListen: () => () => {
                return this.options?.emitter?.onPaused() ?? false
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