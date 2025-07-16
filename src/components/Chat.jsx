// import React, { useState, useEffect, useRef } from "react";
// import { FaUser, FaRobot, FaMicrophone } from "react-icons/fa";
// import { Pin, Headphones, Send } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import "./Chat.css";

// export default function Chat({ selectedDocs, refreshTrigger }) {
//   const endpoint = import.meta.env.VITE_API_URL;

//   const initialBotMessage = {
//     from: "bot",
//     text: "Hi there! I'm StudyBot, your AI study assistant. How can I help you today?",
//     time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
//   };

//   const [messages, setMessages] = useState([initialBotMessage]);
//   const [input, setInput] = useState("");
//   const [notes, setNotes] = useState([]);
//   const [clickedIndex, setClickedIndex] = useState(null);
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);

//   const audioRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     setMessages([initialBotMessage]);
//   }, [refreshTrigger]);

//   const handleAddPinnedNote = (question, answer) => {
//     const newNote = {
//       title: `Pinned: ${question.slice(0, 30)}...`,
//       content: answer,
//       editable: false,
//     };
//     setNotes(prev => [...prev, newNote]);
//   };

//   const playNoteAudioFromAPI = async (text, index) => {
//     setClickedIndex(index);
//     if (playingIndex === index) {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current.currentTime = 0;
//       }
//       setPlayingIndex(null);
//       setClickedIndex(null);
//       return;
//     }

//     try {
//       const response = await fetch(`${endpoint}/generate-audio`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text }),
//       });

//       const audioBlob = await response.blob();
//       const audioUrl = URL.createObjectURL(audioBlob);
//       const audio = new Audio(audioUrl);
//       audioRef.current = audio;

//       audio.onplay = () => {
//         setPlayingIndex(index);
//         setClickedIndex(null);
//       };

//       audio.onended = () => {
//         setPlayingIndex(null);
//         setClickedIndex(null);
//       };

//       await audio.play();
//     } catch (error) {
//       console.error("Audio playback failed:", error);
//       setPlayingIndex(null);
//       setClickedIndex(null);
//     }
//   };

//   const toggleRecording = async () => {
//     if (isRecording) {
//       if (mediaRecorderRef.current?.state === "recording") {
//         mediaRecorderRef.current.stop();
//       }
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//         streamRef.current = null;
//       }
//       setIsRecording(false);
//     } else {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         streamRef.current = stream;

//         const mediaRecorder = new MediaRecorder(stream);
//         mediaRecorderRef.current = mediaRecorder;
//         audioChunksRef.current = [];

//         mediaRecorder.ondataavailable = (e) => {
//           audioChunksRef.current.push(e.data);
//         };

//         mediaRecorder.onstop = async () => {
//           const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//           const formData = new FormData();
//           formData.append("audio", audioBlob, "recording.webm");

//           try {
//             const response = await fetch(`${endpoint}/transcribe`, {
//               method: "POST",
//               body: formData,
//             });

//             const data = await response.json();
//             setInput(data.transcription);
//           } catch (error) {
//             console.error("Transcription failed:", error);
//           }
//         };

//         mediaRecorder.start();
//         setIsRecording(true);
//       } catch (err) {
//         console.error("Microphone access denied or not available", err);
//       }
//     }
//   };

//   const sendMessage = async (customInput) => {
//     const userInput = customInput || input;
//     if (!userInput.trim()) return;

//     const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const userMessage = { from: "user", text: userInput, time };
//     const loadingMessage = {
//       from: "bot",
//       text: (
//         <div className="typing-dots">
//           <div className="typing-dot"></div>
//           <div className="typing-dot"></div>
//           <div className="typing-dot"></div>
//         </div>
//       ),
//       time: "",
//     };

//     setMessages((prev) => [...prev, userMessage, loadingMessage]);
//     setInput("");

//     try {
//       const conversationHistory = [];
//       for (let i = 0; i < messages.length; i++) {
//         const msg = messages[i];
//         if (msg.from === "user" && messages[i + 1]?.from === "bot") {
//           conversationHistory.push({
//             question: msg.text,
//             answer: messages[i + 1].text,
//           });
//           i++;
//         }
//       }

//       conversationHistory.push({ question: userInput, answer: null });

//       const sessionId = sessionStorage.getItem("session_id") || "";

//       const payload = {
//         question: userInput,
//         timestamp: new Date().toISOString(),
//         session_id: sessionId,
//         conversation: conversationHistory,
//       };

//       const filterPayload = {
//         ...payload,
//         selectedDocs: selectedDocs,
//       };

//       let response;
//       if (!selectedDocs || selectedDocs.length === 0) {
//         response = await fetch(`${endpoint}/ask`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         });
//       } else {
//         response = await fetch(`${endpoint}/query_with_filter`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(filterPayload),
//         });
//       }

//       const data = await response.json();
//       if (data.session_id) {
//         sessionStorage.setItem("session_id", data.session_id);
//       }

//       const botReply = data?.reply || "Thanks for your message!";
//       const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//       setMessages((prev) => {
//         const updated = [...prev];
//         updated.pop(); // remove loading
//         return [...updated, { from: "bot", text: botReply, time: botTime }];
//       });
//     } catch (error) {
//       console.error("API error:", error);
//       const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//       setMessages((prev) => {
//         const updated = [...prev];
//         updated.pop(); // remove loading
//         return [
//           ...updated,
//           {
//             from: "bot",
//             text: "Sorry, something went wrong while processing your question.",
//             time: botTime,
//           },
//         ];
//       });
//     }
//   };

//   return (
//     <div className="chat-wrapper">
//       <div className="chat-layout">
//         <div className="chat-sidebar">
//           <div className="sidebar-box">
//             <h4>Pinned Notes</h4>
//             {notes.map((note, idx) => (
//               <div key={idx} className="note">
//                 <strong>{note.title}</strong>
//                 <p>{note.content}</p>
//               </div>
//             ))}
//           </div>
//           <div className="sidebar-box"></div>
//         </div>

//         <div className="chat-container">
//           <div className="chat-messages">
//             {messages.map((msg, index) => (
//               <div key={index} className={`message ${msg.from}`}>
//                 <div className="profile-placeholder">
//                   {msg.from === "user" ? <FaUser size={16} /> : <FaRobot size={16} />}
//                 </div>
//                 <div>
//                   <div className="bubble">
//                     {typeof msg.text === "string" ? (
//                       <ReactMarkdown
//                         components={{
//                           a: ({ node, ...props }) => (
//                             <a {...props} target="_blank" rel="noopener noreferrer" />
//                           ),
//                         }}
//                       >
//                         {msg.text}
//                       </ReactMarkdown>
//                     ) : (
//                       msg.text
//                     )}
//                   </div>
//                   <div className="timestamp">
//                     {msg.time}
//                     {msg.from === "bot" && msg.text !== initialBotMessage.text && (
//                       <>
//                         <Pin
//                           size={12}
//                           style={{ marginLeft: "18px", cursor: "pointer" }}
//                           onClick={() => {
//                             const question = messages[index - 1]?.text || "Unknown";
//                             const answer = typeof msg.text === "string" ? msg.text : "";
//                             handleAddPinnedNote(question, answer);
//                           }}
//                           title="Pin this response"
//                         />
//                         <Headphones
//                           size={12}
//                           style={{
//                             marginLeft: "16px",
//                             cursor: "pointer",
//                             color:
//                               clickedIndex === index
//                                 ? "red"
//                                 : playingIndex === index
//                                 ? "green"
//                                 : "black",
//                           }}
//                           title="Listen to this response"
//                           onClick={() => playNoteAudioFromAPI(msg.text, index)}
//                         />
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="chat-input-area">
//             <div
//               className="mic-button"
//               onClick={toggleRecording}
//               style={{ color: isRecording ? "green" : "black" }}
//               title={isRecording ? "Stop Recording" : "Start Recording"}
//             >
//               <FaMicrophone size={18} />
//             </div>
//             <input
//               type="text"
//               className="chat-input"
//               placeholder="Type a message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button className="send-button" onClick={() => sendMessage()}>
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from 'react';
import './Chat.css';
import { FiMic, FiSend } from 'react-icons/fi';

export default function Chat({ selectedDocs }) {
 const [notes, setNotes] = useState([]);

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

  return (
    <div className="chat-wrapper">
      
      <div className="chat-layout">
        <div className="chat-sidebar">
          <div className="sidebar-box"></div>
          <div className="sidebar-box"></div>
        </div>

        <div className="chat-container">
          <div className="chat-messages">
            <div className="message received">
              <div className="profile-placeholder"></div>
              <div>
                <div className="bubble">Hello, how can I help you?</div>
                <div className="timestamp">04:10 PM</div>
              </div>
            </div>
            <div className="message sent">
              <div className="bubble">I had a query about today's topic.</div>
              <div className="timestamp">04:20 PM</div>
            </div>
          </div>

          <div className="chat-input-area">
            <button className="mic-button">
              <FiMic size={18}  />
            </button>
            <input
              type="text"
              className="chat-input"
              placeholder="Type a message..."
            />
            <button className="send-button">
              <FiSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}