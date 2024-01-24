import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { Button, Checkbox, Form, Input, Space } from "antd"
import { useEffect } from "react"


export const ActionView = (props: any) => {


    const { node, updateAttributes } = props

    useEffect(() => {
        console.log(node)
    }, [node])

    return <NodeViewWrapper>
        <Button contentEditable={false} onClick={() => {
            updateAttributes({
                baba: 'xxx',
                abcd: 'abcd'
            })
        }}>
            添加属性
        </Button>
        <Form contentEditable={false}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Space>
            </Form.Item>
        </Form>

        <div>
            <NodeViewContent />
        </div>
        
        
    </NodeViewWrapper>
}