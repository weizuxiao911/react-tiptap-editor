import { NodeViewContent, NodeViewWrapper } from "@tiptap/react"
import { Button, Checkbox, Form, Input } from "antd"


export const ActionView = (props: any) => {

    const { updateAttributes } = props

    return <NodeViewWrapper>
        <Form
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

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button type="primary" onClick={() => {
                    updateAttributes('bababa', 'bababa')
                }}>
                    添加属性
                </Button>
            </Form.Item>
        </Form>
        
    </NodeViewWrapper>
}