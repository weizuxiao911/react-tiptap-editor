import { Editor } from "@tiptap/react"
import { Button, Divider, Dropdown, MenuProps, Space } from "antd"
import { AlignCenter, AlignLeft, AlignRight, Bold, Braces, ChevronDown, Code2, Eraser, Heading1, Heading2, Heading3, Italic, Link, List, ListOrdered, Quote, Redo, Strikethrough, Subscript, Superscript, Type, Underline, Undo } from "lucide-react"
import { useEffect } from "react"

export type HeadersProps = {

    [key: string]: any
}

const Popover = (props: HeadersProps) => {

    const items: MenuProps['items'] = [
        {
            label: '文本',
            key: 'paragraph',
            icon: <Type size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.setParagraph().run()
            }
        },
        {
            label: '标题1',
            key: 'heading 1',
            icon: <Heading1 size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleHeading({ level: 1 }).run()
            }
        },
        {
            label: '标题2',
            key: 'heading 2',
            icon: <Heading2 size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleHeading({ level: 2 }).run()
            }
        },
        {
            label: '标题3',
            key: 'heading 3',
            icon: <Heading3 size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleHeading({ level: 3 }).run()
            }
        },
        {
            label: '无序列表',
            key: 'bulletList',
            icon: <List size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleBulletList().run()
            }
        },
        {
            label: '有序列表',
            key: 'bulletList',
            icon: <ListOrdered size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleOrderedList().run()
            }
        },
        {
            label: '引用',
            key: 'blockquote',
            icon: <Quote size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleBlockquote().run()
            }
        },
        {
            label: '代码块',
            key: 'codeBlock',
            icon: <Braces size={14} />,
            onClick: () => {
                editor?.chain()?.focus(pmViewDesc?.posAtStart, pmViewDesc?.posAtEnd)?.toggleCodeBlock().run()
            }
        },
    ];

    const menuProps = {
        items
    }

    const { editor, pmViewDesc } = props

    const title = () => {
        if (editor?.isActive('heading', { level: 1 })) return '标题1'
        if (editor?.isActive('heading', { level: 2 })) return '标题2'
        if (editor?.isActive('heading', { level: 3 })) return '标题3'
        if (editor?.isActive('bulletList')) return '无序列表'
        if (editor?.isActive('orderedList')) return '有序列表'
        if (editor?.isActive('codeBlock')) return '代码块'
        if (editor?.isActive('blockquote')) return '引用'

        return '文本'
    }


    useEffect(() => {
        // console.log(pmViewDesc)
    }, [])

    return (
        <Space >
            <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                        {title()}
                        <ChevronDown size={16} />
                    </Space>
                </Button>
            </Dropdown>
            
        </Space>
    )
}

export default Popover