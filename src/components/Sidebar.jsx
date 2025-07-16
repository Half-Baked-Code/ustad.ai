// Sidebar.jsx
import React from 'react';
import {
  FaComments,
  FaCreditCard,
  FaFire,
  FaCog,
  FaMoon,
  FaSignOutAlt,
  FaCommentDots
} from 'react-icons/fa';

import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar"> {/* Removed dynamic class logic */}
      <div className="sidebar-main">
        <div className="sidebar-header">
          <h1 className="sidebar-title">myUstad.ai</h1>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-section-title">Tools</p>
          <ul className="sidebar-nav">
            <li className="sidebar-nav-item active"><FaComments className="sidebar-icon" /> All</li>
            <li className="sidebar-nav-item"><FaCreditCard className="sidebar-icon" /> Subscription</li>
            <li className="sidebar-nav-item"><FaFire className="sidebar-icon" /> Updates <span className="badge">New</span></li>
            <li className="sidebar-nav-item"><FaCog className="sidebar-icon" /> Settings</li>
            <li className="sidebar-nav-item"><FaMoon className="sidebar-icon" /> Change theme</li>
            <li className="sidebar-nav-item"><FaSignOutAlt className="sidebar-icon" /> Logout</li>
          </ul>
        </div>
      </div>

      <div className="sidebar-user">
        <img src="src/assets/avatar.jpg" alt="User Avatar" className="user-avatar" />
        <div className="user-info">
          <div className="user-name-role">
            <span className="user-name">John Doe</span>
            <span className="user-role">Free</span>
          </div>
          <span className="user-email">johndoe@example.com</span>
        </div>
      </div>
    </aside>
  );
}
