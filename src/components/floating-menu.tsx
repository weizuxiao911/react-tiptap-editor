import './style.scss'
import { Button, Space } from "antd"
import { Code2, Heading, Plus, Type } from "lucide-react"
import { useEffect } from "react"

const FloatingMenu = (props: any) => {

    const { editor, pmViewDesc } = props



    useEffect(() => {
        console.log(pmViewDesc)
        
    }, [])

    return <Space className="floating-menu" >
        {pmViewDesc?.node?.type?.name === 'paragraph'
            && !pmViewDesc?.node?.textContent
            && (<Button type="text" size="small" icon={<Plus size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'paragraph'
            && pmViewDesc?.node?.textContent
            && (<Button type="text" size="small" icon={<Type size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'heading'
            && (<Button type="text" size="small" icon={<Heading size={12} />} />)}
        {pmViewDesc?.node?.type?.name === 'codeBlock'
            && (<Button type="text" size="small" icon={<Code2 size={12} />} />)}
    </Space>
}

export default FloatingMenu