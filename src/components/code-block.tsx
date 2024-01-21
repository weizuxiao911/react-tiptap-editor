import './style.scss'
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"

export const CodeBlockView = ({ node, updateAttributes, extension }: any) => {

    return <NodeViewWrapper className="code-block">
        <select contentEditable={false} defaultValue={node?.attrs?.language} onChange={event => updateAttributes({ language: event.target.value })}>
            <option value="null">
                auto
            </option>
            <option disabled>
                —
            </option>
            {extension.options.lowlight.listLanguages().map((lang: any, index: number) => (
                <option key={index} value={lang}>
                    {lang}
                </option>
            ))}
        </select>
        <pre>
            <NodeViewContent as="code" />
        </pre>
    </NodeViewWrapper>
}