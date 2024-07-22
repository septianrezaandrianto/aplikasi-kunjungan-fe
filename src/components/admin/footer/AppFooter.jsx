import React from 'react';
import '../../../assets/AppFooter.css'; // Adjust the path as needed

const AppFooter = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <div className="AppFooter">
            <h2>{currentYear}@pudc</h2>
        </div>
    );
};

export default AppFooter;