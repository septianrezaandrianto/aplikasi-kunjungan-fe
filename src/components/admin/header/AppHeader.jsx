import { Badge, Image, Space, Typography } from "antd";
import { BellFilled, MailOutlined } from '@ant-design/icons'

const AppHeader = () => {
    return (
        <div className="AppHeader">
            <Image width={40} src = "https://www.iconfinder.com/icons/7123025/logo_google_g_icon"/>
            <Typography.Title>
                Admin Dashboard
            </Typography.Title>
            <Space>
                <Badge count={10} dot>
                    <MailOutlined style={{ fontSize: '24'}} />
                </Badge>
                <Badge count ={20}>
                    <BellFilled style={{ fontSize: '24'}} />
                </Badge>
            </Space>
        </div>
    )
};

export default AppHeader;