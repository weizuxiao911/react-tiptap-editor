import './style.scss'
import { useEffect, useRef } from 'react'
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { Button, Input, Select, Space, message } from 'antd'
import Editor from '@monaco-editor/react'
import Terminal from '../components/terminal'
import { BugPlay, Copy, Settings } from 'lucide-react'
import { url } from 'inspector'

export const CodeBlockView = ({ editor, node, getPos, updateAttributes, extension }: any) => {

    // const terminal = useRef<any>()

    const delay = 500
    const debounceWebsocket = useRef<any>()
    const websocket = useRef<WebSocket>()

    const onmessage = () => {

    }

    useEffect(() => {
        const url = node?.attrs?.url
        if (debounceWebsocket?.current) clearTimeout(debounceWebsocket?.current)
        debounceWebsocket.current = setTimeout(() => {
            if (websocket?.current) websocket?.current?.close()
            if (!url) return
            websocket.current = new WebSocket(url)
            // websocket.current.onopen = onopen
            websocket.current.onmessage = onmessage
            // websocket.current.onclose = onclose
        }, delay)
    }, [node?.attrs?.url])

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
        // terminal?.current?.write(node?.textContent)
        websocket?.current?.send(`${node?.textContent}\r`)
    }
    
    return <NodeViewWrapper className="code-block">
        <Space className='code-block-header'>
            <Space>
                <Input placeholder='请输入标题...'
                    defaultValue={node?.attrs?.title ?? ''}
                    style={{ width: 100 }}
                    onChange={(e: any) => updateTitle(e?.target?.value)} />
                <Select
                    defaultValue={node?.attrs?.language ?? ''}
                    style={{ width: 100 }}
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
                
            </Space>
        </Space>

        <pre className='code-block-body'>
            <NodeViewContent as="code" />
        </pre>
        {/* // todo 解决url怎么来的问题 */}
        {/* {node?.attrs?.url &&
            <div className='code-block-footer' style={{ height: '100px' }} >
                <Terminal ref={terminal} url={node?.attrs?.url} />
            </div>
        } */}
    </NodeViewWrapper>
}