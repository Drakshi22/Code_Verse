import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      const inputName = prompt("Enter your username:");
      setUsername(inputName || "Anonymous");
      localStorage.setItem("username", inputName || "Anonymous");
    } else {
      setUsername(storedUsername);
    }

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/messages");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post("http://localhost:5000/messages", {
        text: newMessage,
        user: username,
      });
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">💬 Chat Room</h1>
      
      <div className="bg-gray-100 border rounded-lg p-4 h-80 overflow-y-auto shadow-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-xs px-4 py-2 rounded-lg shadow-sm mb-2 ${
              msg.user === username
                ? "bg-blue-500 text-white self-end"
                : "bg-white text-gray-900 self-start"
            }`}
          >
            <div className="text-sm font-semibold">{msg.user}</div>
            <div className="text-base">{msg.text}</div>
            <div className="text-xs text-gray-300 mt-1 self-end">
              {new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex mt-4 gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-grow px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-black px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
