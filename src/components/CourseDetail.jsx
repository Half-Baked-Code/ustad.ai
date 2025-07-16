// CourseDetail.jsx
import React, { useState } from 'react';
import './Course.css'; 
import './CourseDetail.css'; // Assuming you have a separate CSS file for CourseDetail
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const testDevelopmentModules = [
 {
        name: "Module 1: Foundations of Assessment and Test Development",
        documents: [
          {
            "id": 1,
            "name": "Clarifying the Purposes of Educational Assessment",
            "mapping": "Clarifying the Purposes of Educational Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Clarifying the purposes of educational assessment.md",
            "source": "Clarifying the purposes of educational assessment",
            "chapter": null,
            "viewpath": "/docs/clarifying-the-purposes-of-educational-assessment.md"
          },
          {
            "id": 2,
            "name": "A Review of the Literature on Marking Reliability",
            "mapping": "A Review of the Literature on Marking Reliability",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\A review of the literature on marking reliability.md",
            "source": "**A REVIEW OF THE LITERATURE ON MARKING RELIABILITY**",
            "chapter": null,
            "viewpath": "/docs/a-review-of-the-literature-on-marking-reliability.md"
          },
          {
            "id": 3,
            "name": "A Teacher's Guide to Alternative Assessment",
            "mapping": "A Teachers Guide to Alternative Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\A Teacher s Guide to Alternative Assessment  Taking the First Steps.md",
            "source": "A Teacher's Guide to Alternative Assessment:",
            "chapter": null,
            "viewpath": "/docs/a-teacher-s-guide-to-alternative-assessment.md"
          },
          {
            "id": 4,
            "name": "Chapter 1: Classroom Assessment – Every Student a Learner",
            "mapping": "Chapter 1 Classroom Assessment Every Student a Learner",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter1_classroom_assessment_every_student_a_learner.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 1: Classroom Assessment: Every Student a Learner",
            "viewpath": "/docs/chapter1_classroom_assessment_every_student_a_learner.md"
          },
          {
            "id": 5,
            "name": "Language Effects in International Testing: The Case of PISA 2006 Science Items",
            "mapping": "Language Effects in International Testing The Case of PISA 2006 Science Items",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Language effects in international testing  the case of PISA 2006 science items.md",
            "source": "Language effects in international testing: the case of PISA 2006 science items",
            "chapter": null,
            "viewpath": "/docs/language-effects-in-international-testing-the-case-of-pisa-2006-science-items.md"
          }
        ]
      },
      {
        name: "Module 2: Designing Assessments — Tools, Types, and Techniques",
        documents: [
          {
            "id": 1,
            "name": "Chapter 2: Clear Purpose in Assessment for Learning",
            "mapping": "chapter 2 clear purpose assessment for and of learning",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter2_clear_purpose_assessment_for_and_of_learning.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 2: Clear Purpose: Assessment *for* and *of* Learning",
            "viewpath": "/docs/chapter2_clear_purpose_assessment_for_and_of_learning.md"
          },
          {
            "id": 2,
            "name": "Chapter 3: Clear Targets",
            "mapping": "Chapter 3 Clear Targets",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter3_clear_targets.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "**Chapter 3 Learning Targets**",
            "viewpath": "/docs/chapter3_clear_targets.md"
          },
          {
            "id": 3,
            "name": "Chapter 4: Sound Design",
            "mapping": "Chapter 4 Sound Design",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter4_sound_design.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 4: Sound Design",
            "viewpath": "/docs/chapter4_sound_design.md"
          },
          {
            "id": 4,
            "name": "Chapter 5: Selected Response Assessment",
            "mapping": "Chapter 5 Selected Response Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter5_selected_response_assessment.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 5:  Selected Response Assessment",
            "viewpath": "/docs/chapter5_selected_response_assessment.md"
          },
          {
            "id": 5,
            "name": "Chapter 6: Written Response Assessment",
            "mapping": "Chapter 6 Written Response Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter6_written_response_assessment.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 6:  Written Response Assessment",
            "viewpath": "/docs/chapter6_written_response_assessment.md"
          },
          {
            "id": 6,
            "name": "Chapter 7: Performance Assessment",
            "mapping": "Chapter 7 Performance Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter7_performance_assessment.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 7: Performance Assessment",
            "viewpath": "/docs/chapter7_performance_assessment.md"
          },
          {
            "id": 7,
            "name": "Chapter 8: Personal Communication as Classroom Assessment",
            "mapping": "Chapter 8 Personal Communication as Classroom Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter8_personal_communication_as_classroom_assessment.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 8: Personal Communication as Classroom Assessment",
            "viewpath": "/docs/chapter8_personal_communication_as_classroom_assessment.md"
          },
        ]
      },
      {
        name: "Module 3: Interpreting, Recording, and Using Assessment Data",
        documents: [
          {
            "id": 1,
            "name": "Chapter 9: Record Keeping & Tracking Student Learning",
            "mapping": "Chapter 9 Record Keeping & Tracking Student Learning",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\chapter9_record_keeping_tracking_student_learning.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 9: Record Keeping: Tracking Student Learning",
            "viewpath": "/docs/chapter9_record_keeping_tracking_student_learning.md"
          },
          {
            "id": 2,
            "name": "Chapter 10: Converting Summative Assessment Information into Grades",
            "mapping": "Chapter 10 Converting Summative Assessment Information into Grades",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter10_coverting_summativr_assessment_information_into_grades.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 10: Converting Summative Assessment Information into Grades",
            "viewpath": "/docs/chapter10_coverting_summativr_assessment_information_into_grades.md"
          },
          {
            "id": 3,
            "name": "Chapter 11: Learning Targets",
            "mapping": "Chapter 11 Learning Targets",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\chapter11_learning_targets.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 11: Portfolios",
            "viewpath": "/docs/chapter11_learning_targets.md"
          },
          {
            "id": 4,
            "name": "Chapter 12: Conferences about and with Students",
            "mapping": "Chapter 12 Conferences about and with Students",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\classroom_assessment\\chapter_mds\\chapter12_conferences_about_and_with_students.md",
            "source": "Classroom Assessment for Student Learning Jan Chappuis et al. Second Edition",
            "chapter": "Chapter 12:  Conferences About and with Students",
            "viewpath": "/docs/chapter12_conferences_about_and_with_students.md"
          },
          {
            "id": 5,
            "name": "Criteria, Comparison and Past Experiences: How Do Teachers Make Judgements when Marking Coursework?",
            "mapping": "Criteria, Comparison and Past Experiences How Do Teachers Make Judgements when Marking Coursework",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Criteria, comparison and past experiences  how do teachers make judgements when marking coursework.md",
            "source": "Criteria, comparison and past experiences: how do teachers make judgements when marking coursework?",
            "chapter": null,
            "viewpath": "/docs/criteria-comparison-and-past-experiences-how-do-teachers-make-judgements-when-marking-coursework.md"
          },
          {
            "id": 6,
            "name": "Portfolio Purposes: Teachers Exploring the Relationship between Evaluation and Learning",
            "mapping": "Portfolio Purposes Teachers Exploring the Relationship between Evaluation and Learning",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Portfolio Purposes.md",
            "source": "Portfolio Purposes: Teachers Exploring the Relationshi Between Evaluation an Learning",
            "chapter": null,
            "viewpath": "/docs/portfolio-purposes-teachers-exploring-the-relationshi-between-evaluation-an-learning.md"
          },
          {
            "id": 7,
            "name": "Southeast Missouri State University Rubric Examples",
            "mapping": "Southeast Missouri State University Rubric Examples",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ReferenceBooks\\southeast_missouri\\Southeast Missouri State University (2005) Rubric examples.md",
            "source": "Southeast Massouri State University Rubric Examples",
            "chapter": null,
            "viewpath": "/docs/southeast-missouri-state-university-rubric-examples.md"
          },
          {
            "id": 8,
            "name": "Ongoing Issues in Test Fairness",
            "mapping": "Ongoing Issues in Test Fairness",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Ongoing issues in test fairness.md",
            "source": "Ongoing issues in test fairness",
            "chapter": null,
            "viewpath": "/docs/ongoing-issues-in-test-fairness.md"
          }
        ]
      },
      {
        name: "Module 4: Critical Perspectives and Challenges in Assessment",
        documents: [
          {
            "id": 1,
            "name": "A Review of Multiple-Choice Item Writing Guidelines for Classroom Assessment",
            "mapping": "A Review of Multiple Choice Item Writing Guidelines for Classroom Assessment",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\A Review of Multiple-Choice Item-Writing Guidelines for Classroom Assessment.md",
            "source": "A Review of Multiple-Choice Item-Writing Guidelines for Classroom Assessment",
            "chapter": null,
            "viewpath": "/docs/a-review-of-multiple-choice-item-writing-guidelines-for-classroom-assessment.md"
          },
          {
            "id": 2,
            "name": "Does Washback Exist?",
            "mapping": "Does Washback Exist",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Does Washback Exists.md",
            "source": "Does Washback Exist?",
            "chapter": null,
            "viewpath": "/docs/does-washback-exist.md"
          },
          {
            "id": 3,
            "name": "Can a Picture Ruin a Thousand Words: The Effects of Visual Resources in Exam Questions",
            "mapping": "Can a Picture Ruin a Thousand Words The Effects of Visual Resources in Exam Questions",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Can a picture ruin a thousand words  The effects of visual resources in exam questions.md",
            "source": "Can a picture ruin a thousand words?The effects of visual resources in exam questions",
            "chapter": null,
            "viewpath": "/docs/can-a-picture-ruin-a-thousand-words-the-effects-of-visual-resources-in-exam-questions.md"
          },
          {
            "id": 4,
            "name": "Deficiency, Contamination, and the Signal Processing Metaphor",
            "mapping": "Deficiency Contamination and the Signal Processing Metaphor",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Deficiency, Contamination, and the Signal Processing Metaphor.md",
            "source": "Deficiency, Contamination, and the Signal Processing Metaphor",
            "chapter": null,
            "viewpath": "/docs/deficiency-contamination-and-the-signal-processing-metaphor.md"
          },
          {
            "id": 5,
            "name": "Macro and Micro Validation: Beyond the Five Sources Framework for Classifying Validation Evidence and Analysis",
            "mapping": "Macro and Micro Validation Beyond the Five Sources Framework for Classifying Validation Evidence and Analysis",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Macro- and Micro-Validation- Beyond the ΓÇÿFive SourcesΓÇÖ Framework for Classifying Validation Evidence and Analysis.md",
            "source": "Macro- and Micro-Validation: Beyond the ‘Five Sources’ Framework for Classifying Validation Evidence and Analysis",
            "chapter": null,
            "viewpath": "/docs/macro-and-micro-validation-beyond-the-five-sources-framework-for-classifying-validation-evidence-and-analysis.md"
          },
          {
            "id": 6,
            "name": "Threats to the Valid Use of Assessments",
            "mapping": "Threats to the Valid Use of Assessments",
            "path": "C:\\Users\\Maham Jafri\\Documents\\Office Tasks\\Durbeen\\ResearchArticles\\research_mds\\Threats to the Valid Use of Assessments.md",
            "source": "Threats to the Valid Use of Assessments",
            "chapter": null,
            "viewpath": "/docs/threats-to-the-valid-use-of-assessments.md"
          }
        ]
      }
];
export default function CourseDetail({ courseName, onBack, selectedDocs, setSelectedDocs }) {
  const [openedDoc, setOpenedDoc] = useState(null);

  const handleCheckboxChange = (doc, moduleName) => {
    const uniqueId = `${moduleName}-${doc.id}`;
    setSelectedDocs(prevSelected => {
      const exists = prevSelected.some(d => d.uniqueId === uniqueId);
      if (exists) {
        return prevSelected.filter(d => d.uniqueId !== uniqueId);
      } else {
        return [...prevSelected, { ...doc, uniqueId }];
      }
    });
  };

  const openDocument = async (doc) => {
    try {
      const res = await fetch(doc.viewpath);
      const text = await res.text();
      setOpenedDoc({ name: doc.name, content: text });
    } catch (error) {
      console.error("Error loading document", error);
      setOpenedDoc({ name: doc.name, content: '⚠️ Unable to load document.' });
    }
  };

  return (
    <div className="course-content-layout">
      <div className="course-sidebar">
        <button className="back-button" onClick={onBack}>
          Back to Courses
        </button>
        <h2>{courseName}</h2>

        {courseName === 'Test Development and Evaluation' ? (
          testDevelopmentModules.map((module, idx) => (
            <div key={idx} className="module-block">
              <h3>{module.name}</h3>
              {module.documents.map((doc, idy) => {
                const uniqueId = `${module.name}-${doc.id}`;
                const isChecked = selectedDocs.some(d => d.uniqueId === uniqueId);

                return (
                  <div key={idy} className="lecture-card">
                    <div className="lecture-icon">📄</div>
                    <div className="lecture-info">
                      <div
                        className="lecture-title"
                        style={{ cursor: 'pointer', color: 'black' }}
                        onClick={() => openDocument(doc)}
                      >
                        {doc.name}
                      </div>
                      <div className="lecture-subtitle">{doc.subtitle}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCheckboxChange(doc, module.name)}
                    />
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <p>Module content will be available soon.</p>
        )}
      </div>

      <div className="lecture-preview">
        {openedDoc ? (
          <div className="opened-doc">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '12px' }}>{openedDoc.name}</h3>
              <button
                onClick={() => setOpenedDoc(null)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '12px',
                  cursor: 'pointer',
                  color: 'red',
                }}
              >
                ❌
              </button>
            </div>
            <div className="doc-content" style={{ marginTop: '10px' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {openedDoc.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <p>Click a document to preview</p>
        )}
      </div>
    </div>
  );
}
