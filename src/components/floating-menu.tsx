import './style.scss'
import { Button, Space } from "antd"
import { Code2, Heading, List, ListOrdered, Plus, Presentation, Type } from "lucide-react"

const FloatingMenu = (props: any) => {

    const { editor, pmViewDesc } = props

    return <Space className="floating-menu" >
        {(pmViewDesc?.parent?.node?.type?.name === 'bulletList'
            || pmViewDesc?.parent?.parent?.node?.type?.name === 'bulletList')
            && (<Button type="text" size="small" icon={<List size={12} />} />)}
        {(pmViewDesc?.parent?.node?.type?.name === 'orderedList'
            || pmViewDesc?.parent?.parent?.node?.type?.name === 'orderedList')
            && (<Button type="text" size="small" icon={<ListOrdered size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'paragraph'
            && !pmViewDesc?.node?.textContent
            && pmViewDesc?.parent?.node?.type?.name === 'document'
            && (<Button type="text" size="small" icon={<Plus size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'paragraph'
            && pmViewDesc?.node?.textContent
            && pmViewDesc?.parent?.node?.type?.name === 'document'
            && (<Button type="text" size="small" icon={<Type size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'heading'
            && pmViewDesc?.parent?.node?.type?.name === 'document'
            && (<Button type="text" size="small" icon={<Heading size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'codeBlock'
            && pmViewDesc?.parent?.node?.type?.name === 'document'
            && (<Button type="text" size="small" icon={<Code2 size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'action'
            && pmViewDesc?.parent?.node?.type?.name === 'document'
            && (<Button type="text" size="small" icon={<Presentation size={12} />} />)}
    </Space>
}

export default FloatingMenu