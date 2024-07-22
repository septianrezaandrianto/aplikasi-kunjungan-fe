import { Menu } from "antd";
import { AppstoreOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Admin from "../../../pages/Admin";
import Guest from "../../../pages/Guest";
import Report from "../../../pages/Report";
import Dashboard from "../../../pages/Dashboard";

const AppSideMenu = () => {

    const { SubMenu } = Menu;
    const handleMenuClick = (item) => {
        navigate(item.key);
      };
    const navigate = useNavigate()

    return (
        <div className="AppSideMenu">
            <Menu onClick={handleMenuClick} mode="inline">
                <Menu.Item key="/admin"><Dashboard/></Menu.Item>
                <Menu.Item key="/admin/admin"><Admin/></Menu.Item>
                <Menu.Item key="/admin/guest"><Guest /></Menu.Item>
                <Menu.Item key="/admin/report"><Report/></Menu.Item>
            </Menu>
        </div>
    )
};

export default AppSideMenu;