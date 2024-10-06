import React from 'react';
import { FaHome, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

const SideMenu = () => {
    return (
        <div className="side-menu">
            <div className="menu-item">
                <FaHome className="icon" />
                <span className='icon-name' >Home</span>
            </div>
            <div className="menu-item">
                <FaUserAlt className="icon" />
                <span className='icon-name'>Profile</span>
            </div>
            <div className="menu-item">
                <FaCog className="icon" />
                <span className='icon-name'>Settings</span>
            </div>
            <div className="menu-item">
                <FaSignOutAlt className="icon" />
                <span className='icon-name'>Logout</span>
            </div>
        </div>
    );
};

export default SideMenu;
