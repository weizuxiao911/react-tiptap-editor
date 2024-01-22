import './style.scss'
import { Button, Divider, Flex, MenuProps, Space } from "antd"
import { AlignCenter, AlignLeft, AlignRight, Bold, Braces, Code2, Heading1, Heading2, Heading3, Italic, Link, List, ListOrdered, Quote, Strikethrough, Subscript, Superscript, Type, Underline } from "lucide-react"

const BubblMenu = (props: any) => {

    const items: MenuProps['items'] = [
        {
            label: '文本',
            key: 'paragraph',
            icon: <Type size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.setParagraph().run()
            }
        },
        {
            label: '标题1',
            key: 'heading 1',
            icon: <Heading1 size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleHeading({ level: 1 }).run()
            }
        },
        {
            label: '标题2',
            key: 'heading 2',
            icon: <Heading2 size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleHeading({ level: 2 }).run()
            }
        },
        {
            label: '标题3',
            key: 'heading 3',
            icon: <Heading3 size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleHeading({ level: 3 }).run()
            }
        },
        {
            label: '无序列表',
            key: 'bulletList',
            icon: <List size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleBulletList().run()
            }
        },
        {
            label: '有序列表',
            key: 'bulletList',
            icon: <ListOrdered size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleOrderedList().run()
            }
        },
        {
            label: '引用',
            key: 'blockquote',
            icon: <Quote size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleBlockquote().run()
            }
        },
        {
            label: '代码块',
            key: 'codeBlock',
            icon: <Braces size={14} />,
            onClick: () => {
                editor?.chain()?.focus()?.toggleCodeBlock().run()
            }
        },
    ];

    const menuProps = {
        items
    }

    const { editor } = props

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

    return (
        <Space className="bubble-menu">
            {/* <Dropdown menu={menuProps}>
                <Button>
                    <Space>
                        {title()}
                        <ChevronDown size={16} />
                    </Space>
                </Button>
            </Dropdown> */}
            <Button size='small'
                type={editor?.isActive('bold') ? 'link' : 'text'}
                icon={<Bold size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleBold()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleBold()?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive('italic') ? 'link' : 'text'}
                icon={<Italic size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleItalic()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleItalic()?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive('strike') ? 'link' : 'text'}
                icon={<Strikethrough size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleStrike()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleStrike()?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive('underline') ? 'link' : 'text'}
                icon={<Underline size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleUnderline()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleUnderline()?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive('code') ? 'link' : 'text'}
                icon={<Code2 size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleCode()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleCode()?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive('code') ? 'link' : 'text'}
                icon={<Subscript size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleSubscript()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleSubscript()?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive('code') ? 'link' : 'text'}
                icon={<Superscript size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.toggleSuperscript()?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleSuperscript()?.run()
                }}
            />
            <Divider type="vertical" />
            <Button size='small'
                type={editor?.isActive({ textAlign: 'left' }) ? 'link' : 'text'}
                icon={<AlignLeft size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.setTextAlign('left')?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.setTextAlign('left')?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive({ textAlign: 'center' }) ? 'link' : 'text'}
                icon={<AlignCenter size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.setTextAlign('center')?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.setTextAlign('center')?.run()
                }}
            />
            <Button size='small'
                type={editor?.isActive({ textAlign: 'right' }) ? 'link' : 'text'}
                icon={<AlignRight size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.setTextAlign('right')?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.setTextAlign('right')?.run()
                }}
            />
            <Divider type='vertical' />
            <input
                style={{ width: '32px' }}
                type="color"
                disabled={!editor?.can()?.chain()?.focus()?.setColor('#000').run()}
                onInput={(event: any) => {
                    console.log(event?.target?.value)
                    editor?.chain()?.focus()?.setColor(event?.target?.value).run()
                }}
                value={editor?.getAttributes('textStyle').color}
                data-testid="setColor"
            />
            <Button size='small'
                type={editor?.isActive('link') ? 'link' : 'text'}
                icon={<Link size={16} />}
                disabled={!editor?.can()?.chain()?.focus()?.setLink({ href: '' })?.run()}
                onClick={() => {
                    editor?.chain()?.focus()?.toggleUnderline()?.run()
                }}
            />
        </Space>
    )
}

export default BubblMenu