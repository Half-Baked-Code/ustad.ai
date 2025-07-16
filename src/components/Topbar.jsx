// Topbar.jsx
import React from 'react';
import { FaGlobe } from 'react-icons/fa';

export default function Topbar({ activeTab, setActiveTab, language, setLanguage }) {
  return (
    <div className="topbar">
      <div className="tabs">
        {['Courses', 'Syllabus', 'Chat', 'Study Material', 'Podcasts'].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="profile">
        <div className="language-wrapper">
          <FaGlobe className="language-icon" />
          <select
            className="language-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="اردو">اردو</option>
            <option value="پنجابی">پنجابی</option>
            <option value="سندھی">سندھی</option>
            <option value="پشتو">پشتو</option>
          </select>
        </div>
      </div>
    </div>
  );
}
