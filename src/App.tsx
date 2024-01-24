import './App.scss'
import { useState } from 'react'
import { Button, Layout, Space, theme } from 'antd'
import { ChevronsRight, ChevronsLeft, } from 'lucide-react'
import { EditorContent } from '@tiptap/react'
import Editor from './components/editor'
import { Tom } from './components/tom'

const { Sider, Header, Content } = Layout

const App = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const editor = Editor()

  const [collapsed, setCollapsed] = useState<boolean>(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout hasSider>
      <Sider className='sider'
        style={{ background: colorBgContainer }}
        // collapsedWidth={0}
        trigger={null}
        collapsible
        collapsed={collapsed}>

          {/** 左侧菜单栏 */}



        {/* <div className='tom'>
          <Tom editor={editor} />
        </div> */}
      </Sider>
      <Layout>
        <Header className='header'
          style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            onClick={() => toggleCollapsed()}
          />
          <Space>
            <Button size='small' onClick={async () => {
              const clipboardItems = await navigator.clipboard.read()
              for (const clipboardItem of clipboardItems) {
                const types = clipboardItem?.types
                for (let t of types) {
                  console.log(t)
                  const blob = await clipboardItem?.getType(t)
                  const fileReader = new FileReader()
                  fileReader.onloadend = () => {
                    console.log(fileReader.result)
                  }
                  fileReader.readAsText(blob)
                  console.log(blob)
                }
              }
            }}>粘贴板</Button>
            <Button size='small' onClick={() => {
              console.log(editor?.getJSON())
            }}>打印数据</Button>
            <Button size='small' onClick={() => {
              editor?.chain()?.updateAttributes('codeBlock', {
                url: 'ws://127.0.0.1:5000/terminal?pod=nodejs-7c6dcd8575-sbxcr&shell=node'
              })?.run()
            }}>加载环境</Button>
          </Space>

          {/* <Headers editor={editor} /> */}
        </Header>
        <Content className='content'>
          <EditorContent className='editor'
            style={{ background: colorBgContainer }}
            editor={editor} />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
