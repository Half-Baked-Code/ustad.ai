import React, { useState } from 'react';
import './Chat.css';
import { FiMic, FiSend } from 'react-icons/fi';
import DocChat from "./DocChat";

export default function Chat({ selectedDocs }) {
 const [notes, setNotes] = useState([]);
 const [refreshTrigger, setRefreshTrigger] = useState(0);
 const [selectedNote, setSelectedNote] = useState(null);
const [showModal, setShowModal] = useState(false);


  // This function handles adding a pinned note. It creates a new note object with the question and answer,and appends it to the existing notes array
  // since the state needs to be passed from the CardTwo component to the CardThree component, we define this function here in the parent component
  const handleAddPinnedNote = (question, answer) => {
    const newNote = {
      title: `Pinned: ${question.slice(0, 30)}...`,
      content: answer,
      editable: false,
    };
    setNotes(prev => [...prev, newNote]);
  };
  
  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1); // Increment to trigger Chat reset
  };

  return (
    <div className="chat-wrapper">
       <div className="chat">
        <DocChat
          selectedDocs={selectedDocs}
          refreshTrigger={refreshTrigger}
            onPinNote={handleAddPinnedNote} // ← UNCOMMENT THIS

        />
       </div>
       <div className="chat-history">
              <h4 style={{ margin: '10px' }}>Pinned Notes</h4>
              {notes.length === 0 ? (
                <p style={{ margin: '10px', fontSize: '0.9rem' }}>No pinned notes yet.</p>
              ) : (
               notes.map((note, idx) => (
              <div
                key={idx}
                className="note-card"
                onClick={() => {
                  setSelectedNote(note);
                  setShowModal(true);
                }}
                style={{
                  margin: '10px',
                  padding: '10px',
                  background: '#f3f3f3',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <strong>{note.title}</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '5px' }}>{note.content}</p>
              </div>
            ))
           )}


       </div>
       {showModal && selectedNote && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
          >
            <h3>{selectedNote.title}</h3>
            <p>{selectedNote.content}</p>
            <button
              style={{ float: 'right', cursor: 'pointer', border: 'none', background: 'transparent', fontSize: '1.2rem' }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

    </div>
  );
}