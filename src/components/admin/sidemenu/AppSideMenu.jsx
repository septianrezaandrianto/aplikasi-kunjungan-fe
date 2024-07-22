import { Menu } from "antd";
import { DashboardOutlined, TeamOutlined, UnorderedListOutlined, FileTextOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const AppSideMenu = () => {
    const navigate = useNavigate();

    const handleMenuClick = (item) => {
        navigate(item.key);
    };

    return (
        <div className="AppSideMenu" style={{ height: '100%', width: '256px', background: '#fff' }}>
            <Menu
                className="SideMenuVertical"
                mode="inline"
                onClick={handleMenuClick}
                items={[
                    {
                        label: "Dashboard",
                        icon: <DashboardOutlined />,
                        key: "/admin"
                    },
                    {
                        label: "Admin",
                        icon: <TeamOutlined />,
                        key: "/admin/admin"
                    },
                    {
                        label: "Daftar Tamu",
                        icon: <UnorderedListOutlined />,
                        key: "/admin/guest"
                    },
                    {
                        label: "Laporan",
                        icon: <FileTextOutlined />,
                        key: "/admin/report"
                    }
                ]}
            />
        </div>
    );
};

export default AppSideMenu;
