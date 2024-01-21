import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { CodeBlockView } from "../components/code-block";


export const CodeBlcok = CodeBlockLowlight.extend({

    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockView)
    }

})