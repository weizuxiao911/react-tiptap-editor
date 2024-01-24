import "./style.scss"
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { Space } from "antd"
import { CircleUser } from "lucide-react"


export const TitleView = (props: any) => {

    return <NodeViewWrapper className="content-title" style={{ marginBottom: '20px'}}>
        <NodeViewContent data-placeholder="请输入标题..." as="h1" />
        <Space>
            <CircleUser size={14}/>这里显示作者
        </Space>
    </NodeViewWrapper>

}