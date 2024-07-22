import React, { useState } from 'react';
import { Space } from "antd";
import AppHeader from '../admin/header/AppHeader';
import AppPageContent from '../admin/pagecontent/AppPageContent';
import AppSideMenu from '../admin/sidemenu/AppSideMenu';
import AppFooter from '../admin/footer/AppFooter';
import '../../assets/AppAdminStyle.css';

function AppAdmin() {
    const [collapsed, setCollapsed] = useState(false);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`AppAdmin ${collapsed ? 'collapsed' : ''}`}>
            <AppHeader onToggleSidebar={handleToggleSidebar} />
            <div className="SideMenuAndPageContent">
                <AppSideMenu className={collapsed ? 'collapsed' : ''} />
                <AppPageContent />
            </div>
            <AppFooter />
        </div>
    );
}

export default AppAdmin;
