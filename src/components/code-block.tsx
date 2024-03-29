import './style.scss'
import { useRef, useState } from 'react'
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { Button, Input, Modal, Select, Space, message } from 'antd'
import Terminal from '../components/terminal'
import { BugPlay, Copy, Settings } from 'lucide-react'

export const CodeBlockView = ({ editor, node, getPos, updateAttributes, extension }: any) => {

    const terminal = useRef<any>()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handle = (value: any) => {
        const from = getPos() + 1
        const to = from + node?.textContent?.length
        console.log(value, from, to)
        if (value) {
            editor?.chain()?.insertContentAt({
                from,
                to
            }, {
                type: 'text',
                text: value
            }, {
                updateSelection: true
            })?.run()
            return
        }
        editor?.chain()?.deleteRange({ from: from, to })?.run()
    }

    const updateTitle = (value: string) => {
        updateAttributes({
            title: value
        })
    }

    const updateLang = (value: string) => {
        updateAttributes({
            language: value
        })
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(node?.textContent).then(() => {
            message.success('复制成功');
        });
    }

    const handlePlay = () => {
        if (!node?.textContent) return
        terminal?.current?.write(node?.textContent)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    return <NodeViewWrapper className="code-block">
        <Space className='code-block-header'>
            <Space>
                <Input placeholder='请输入标题...'
                    defaultValue={node?.attrs?.title ?? ''}
                    style={{ width: 150 }}
                    onChange={(e: any) => updateTitle(e?.target?.value)} />
                <Select
                    defaultValue={node?.attrs?.language ?? ''}
                    style={{ width: 120 }}
                    onChange={updateLang}
                    options={[
                        { value: '', label: 'atuo' },
                        ...extension?.options?.lowlight?.listLanguages()?.map((lang: string) => {
                            return { value: lang, label: lang }
                        })
                    ]}
                />
            </Space>
            <Space>
                {node?.attrs?.copy &&
                    <Button type='text' size='small' icon={<Copy size={14} />}
                        onClick={handleCopy}
                    />
                }
                {node?.attrs?.url &&
                    <Button type='text' size='small' icon={<BugPlay size={14} />}
                        onClick={handlePlay}
                    />
                }
                <Button type='text' size='small' icon={<Settings size={14} />}
                    onClick={showModal}
                />

            </Space>
        </Space>

        <pre className='code-block-body'>
            <NodeViewContent as="code" />
        </pre>
        {/* todo 解决url怎么来的问题 */}
        {node?.attrs?.url &&
            <div className='code-block-footer' style={{ height: '100px' }} >
                <Terminal ref={terminal} url={node?.attrs?.url} />
            </div>
        }

        <Modal title={`${node?.attrs?.title ?? ''}_设置`}
            open={isModalOpen}
            onOk={hideModal}
            onCancel={hideModal}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    </NodeViewWrapper>
}