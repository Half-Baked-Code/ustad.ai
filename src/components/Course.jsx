// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';
// import CourseDetail from './CourseDetail';
// import Chat from './Chat'; // ✅ Import Chat component
// import './Course.css';

// export default function Course() {
//   const [activeTab, setActiveTab] = useState('Courses');
//   const [language, setLanguage] = useState('English');
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedDocs, setSelectedDocs] = useState([]);
  

//   const courses = [
//     'Test Development and Evaluation',
//     'Research Methods',
//     'Criminal Law',
//     'Legal System and Methods',
//     'Public Law',
//     'Contract Law',
//     'Commerical Law',
//     'Equity and Trust',
//     'Educational Law',
//   ];

//   // ✅ Reset course view when "Courses" tab is clicked
//   useEffect(() => {
//     if (activeTab === 'Courses' && selectedCourse !== null) {
//       setSelectedCourse(null);
//     }
//   }, [activeTab, selectedCourse]);

//   const renderContent = () => {
//   if (activeTab === 'Chat') {
//     return <Chat selectedDocs={selectedDocs} />;
//   }

//   if (!selectedCourse) {
//     return (
//       <div className="content-grid">
//         {courses.map((course, index) => (
//           <div
//             key={index}
//             className="course-card"
//             onClick={() => {
//               setSelectedCourse(course);
//               setActiveTab('Syllabus');
//             }}
//           >
//             <div className="card-thumbnail"></div>
//             <div className="card-title">{course}</div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   return (
//     <CourseDetail
//       courseName={selectedCourse}
//       onBack={() => {
//         setSelectedCourse(null);
//         setActiveTab('Courses');
//       }}
//       selectedDocs={selectedDocs}
//       setSelectedDocs={setSelectedDocs}
//     />
//   );
// };


//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <div className="main">
//         <Topbar
//           activeTab={activeTab}
//           setActiveTab={setActiveTab}
//           language={language}
//           setLanguage={setLanguage}
//         />
//         {renderContent()}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import CourseDetail from './CourseDetail';
import Chat from './Chat'; // ✅ Import Chat component
import StudyMaterial from './StudyMaterial'; // ✅ Import StudyMaterial component
import './Course.css';

export default function Course() {
  const [activeTab, setActiveTab] = useState('Courses');
  const [language, setLanguage] = useState('English');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDocs, setSelectedDocs] = useState([]);

  const courses = [
    'Test Development and Evaluation',
    'Research Methods',
    'Criminal Law',
    'Legal System and Methods',
    'Public Law',
    'Contract Law',
    'Commerical Law',
    'Equity and Trust',
    'Educational Law',
  ];

  // ✅ Reset course view when "Courses" tab is clicked
  useEffect(() => {
    if (activeTab === 'Courses' && selectedCourse !== null) {
      setSelectedCourse(null);
    }
  }, [activeTab, selectedCourse]);

  // ✅ Render content for different tabs (Study Material, Chat, Courses)
  const renderContent = () => {
    if (activeTab === 'Chat') {
      return <Chat selectedDocs={selectedDocs} />;
    }

    if (activeTab === 'Study Material') {
      return <StudyMaterial selectedDocs={selectedDocs}/>;
    }

    if (activeTab === 'Conversational') {
  return (
    <div className="coming-soon-wrapper">
      <div className="coming-soon-card">
        <p>This feature is coming soon. Stay tuned!</p>
      </div>
    </div>
  );
}


    if (!selectedCourse) {
      return (
        <div className="content-grid">
          {courses.map((course, index) => (
            <div
              key={index}
              className="course-card"
              onClick={() => {
                setSelectedCourse(course);
                setActiveTab('Syllabus');
              }}
            >
              <div className="card-thumbnail"></div>
              <div className="card-title">{course}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <CourseDetail
        courseName={selectedCourse}
        onBack={() => {
          setSelectedCourse(null);
          setActiveTab('Courses');
        }}
        selectedDocs={selectedDocs}
        setSelectedDocs={setSelectedDocs}
      />
    );
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Topbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          setLanguage={setLanguage}
        />
        {renderContent()}
      </div>
    </div>
  );
}
