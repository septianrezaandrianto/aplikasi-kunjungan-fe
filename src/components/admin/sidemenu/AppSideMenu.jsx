import { Menu } from "antd";
import { AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const AppSideMenu = () => {

    const handleMenuClick = (item) => {
        navigate(item.key);
    };
    const navigate = useNavigate()
    return (
        <div className="AppSideMenu" style={{height: '100%'}}>
            <Menu 
                className="SideMenuVertical"
                mode= "vertical"
                onClick={handleMenuClick}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined/>,
                        key: "/admin"
                    }, 
                    {
                        label: "Admin",
                        icon: <AppstoreOutlined/>,
                        key: "/admin/admin"
                    }, 
                    {
                        label: "Daftar Tamu",
                        icon: <AppstoreOutlined/>,
                        key: "/admin/guest"
                    }, 
                    {
                        label: "Laporan",
                        icon: <AppstoreOutlined/>,
                        key: "/admin/report"
                    }
                ]}>    
            </Menu>
        </div>
    )
};

export default AppSideMenu;