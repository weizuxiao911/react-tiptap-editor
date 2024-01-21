import { Editor } from "@tiptap/core"
import { Plugin, PluginKey } from "@tiptap/pm/state"
import { MouseEmitter } from "./mouse-emitter"

export interface MousePluginProps {
    emitter: MouseEmitter | null
}

export const MousePlugin = ({ emitter }: MousePluginProps) => {

    return new Plugin({
        key: new PluginKey('mousePlugin'),
        view: () => {
            return {
                update: (view, prevState) => {
                    emitter && emitter?.update(view, prevState)
                },
                destroy: () => {
                    emitter && emitter?.destroy()
                }
            }
        },
        props: {
            handleDOMEvents: {
                mousemove: (view, event) => {
                    if (emitter) {
                        return emitter?.move(view, event)
                    }
                }
            },
        }
    })
}