import './App.scss'
import {  useState } from 'react'
import { Button, Layout, theme } from 'antd'
import { ChevronsRight, ChevronsLeft, } from 'lucide-react'
import { EditorContent } from '@tiptap/react'
import Editor from './components/editor'
import Headers from './components/header'

const { Sider, Header, Content } = Layout

const App = () => {

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const editor = Editor()

  const [collapsed, setCollapsed] = useState<boolean>(true)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout hasSider>
      <Sider className='sider'
        style={{ background: colorBgContainer }}
        collapsedWidth={0}
        trigger={null}
        collapsible
        collapsed={collapsed}>
      </Sider>
      <Layout>
        <Header className='header'
          style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
            onClick={() => toggleCollapsed()}
          />
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
