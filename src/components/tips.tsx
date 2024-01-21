import { Button, Divider, Flex, Input, Space } from "antd"
import { Edit } from "lucide-react"
import { useEffect } from "react"


const Tips = (props: any) => {

    const { pmViewDesc } = props

    useEffect(() => {
    }, [])

    return <Flex>
        <Space >
            <Input disabled defaultValue={pmViewDesc?.node?.textContent} />
            <Button size='small'
                icon={<Edit size={16} />}
            />
            <Divider type="vertical" />

        </Space>
    </Flex>

}

export default Tips