// Chat.js
import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRobot, FaMicrophone } from "react-icons/fa";
import { Pin, Headphones, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import "./Chats.css"; // Match your CSS to this structure

const Chats = ({ selectedDocs, refreshTrigger, onPinNote }) => {
  const initialBotMessage = {
    from: "bot",
    text: "Hi there! I'm StudyBot, your AI study assistant. How can I help you today?",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const endpoint = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setMessages([initialBotMessage]);
  }, [refreshTrigger]);

  const playNoteAudioFromAPI = async (text, index) => {
    setClickedIndex(index);
    if (playingIndex === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setPlayingIndex(null);
      setClickedIndex(null);
      return;
    }

    try {
      const response = await fetch(`${endpoint}/generate-audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => {
        setPlayingIndex(index);
        setClickedIndex(null);
      };

      audio.onended = () => {
        setPlayingIndex(null);
        setClickedIndex(null);
      };

      await audio.play();
    } catch (error) {
      console.error("Audio playback failed:", error);
      setPlayingIndex(null);
      setClickedIndex(null);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      setIsRecording(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");

          try {
            const response = await fetch(`${endpoint}/transcribe`, {
              method: "POST",
              body: formData,
            });

            const data = await response.json();
            setInput(data.transcription);
          } catch (error) {
            console.error("Transcription failed:", error);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or not available", err);
      }
    }
  };

  const TypingDots = () => (
    <div className="typing-dots">
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
    </div>
  );

  const sendMessage = async (customInput) => {
    const userInput = customInput || input;
    if (!userInput.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMessage = { from: "user", text: userInput, time };
    const loadingMessage = { from: "bot", text: <TypingDots />, time: "" };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");

    try {
      const conversationHistory = [];
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        if (msg.from === "user" && messages[i + 1]?.from === "bot") {
          conversationHistory.push({
            question: msg.text,
            answer: messages[i + 1].text,
          });
          i++;
        }
      }

      conversationHistory.push({
        question: userInput,
        answer: null,
      });

      const sessionId = sessionStorage.getItem("session_id") || "";
      const payload = {
        question: userInput,
        timestamp: new Date().toISOString(),
        session_id: sessionId,
        conversation: conversationHistory,
      };

      const filterPayload = {
        ...payload,
        selectedDocs: selectedDocs,
      };

      let response;
      if (!selectedDocs || selectedDocs.length === 0) {
        response = await fetch(`${endpoint}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${endpoint}/query_with_filter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filterPayload),
        });
      }

      const data = await response.json();
      if (data.session_id) {
        sessionStorage.setItem("session_id", data.session_id);
      }

      const botReply = data?.reply || "Thanks for your message! I am working on it.";
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // Remove typing indicator
        return [...updated, { from: "bot", text: botReply, time: botTime }];
      });
    } catch (error) {
      console.error("API error:", error);
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // Remove loading
        return [
          ...updated,
          {
            from: "bot",
            text: "Sorry, something went wrong while processing your question.",
            time: botTime,
          },
        ];
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from}`}>
            <div className="message-icon">
              {msg.from === "user" ? <FaUser size={16} /> : <FaRobot size={16} />}
            </div>
            <div className="bubble-timestamp">
              <div className="bubble">
                {typeof msg.text === "string" ? (
                  <ReactMarkdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
              <div className="timestamp">
                {msg.time}
                {msg.from === "bot" && msg.text !== initialBotMessage.text && (
                  <>
                    <Pin
                      size={12}
                      style={{ marginLeft: "18px", cursor: "pointer" }}
                      title="Pin this response"
                      onClick={() => {
                        const userQuestion =
                          messages[index - 1]?.from === "user"
                            ? messages[index - 1].text
                            : "Unknown Question";
                        const botAnswer = typeof msg.text === "string" ? msg.text : "";
                        onPinNote(userQuestion, botAnswer);
                      }}
                    />
                    <Headphones
                      size={12}
                      style={{
                        marginLeft: "16px",
                        cursor: "pointer",
                        color:
                          clickedIndex === index
                            ? "red"
                            : playingIndex === index
                            ? "green"
                            : "black",
                      }}
                      title="Listen to this response"
                      onClick={() => playNoteAudioFromAPI(msg.text, index)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <button
          className="mic-button"
          onClick={toggleRecording}
          style={{ color: isRecording ? "green" : "black" }}
          title={isRecording ? "Stop Recording" : "Start Recording"}
        >
          <FaMicrophone />
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={() => sendMessage()}>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default Chats;
