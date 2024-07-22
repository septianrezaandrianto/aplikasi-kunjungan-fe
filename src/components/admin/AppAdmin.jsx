import { Space } from "antd";
import AppHeader from '../admin/header/AppHeader';
import AppPageContent from '../admin/pagecontent/AppPageContent';
import AppSideMenu from '../admin/sidemenu/AppSideMenu';
import AppFooter from '../admin/footer/AppFooter';
import '../../assets/AppAdminStyle.css';
import { BrowserRouter as Router } from "react-router-dom";

function AppAdmin() {
    return (
        <div className="AppAdmin">
            <AppHeader/>
            <Space className="SideMenuAndPageContent">
                <AppSideMenu/>
                <AppPageContent/>
            </Space>
            <AppFooter/>
        </div>
    );
};

export default AppAdmin;