import CodeBlockLowlight, { CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight"
import { ReactNodeViewRenderer } from "@tiptap/react"
import { CodeBlockView } from "../components/code-block"

export interface CodeBlockOptions extends CodeBlockLowlightOptions {
    nodeView: ((props: any) => React.JSX.Element) | null
    backspace: boolean
}

export const CodeBlcok = CodeBlockLowlight.extend<CodeBlockOptions>({

    addOptions() {
        return {
            ...this.parent?.(),
            nodeView: null,
            backspace: false
        }
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            title: {
                default: ''
            },
            copy: {
                default: true
            },
            play: {
                default: false
            },
            url: {
                default: ''
            }
        }
    },

    addNodeView() {
        return ReactNodeViewRenderer(this?.options?.nodeView ?? CodeBlockView)
    },

    

})