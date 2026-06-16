// src/components/ChatbotButton.tsx
"use client";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react"; // Lucide chat icon

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chatbot Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition"
        title="Chat with us"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chatbot Window */}
      {open && (
        <div className="fixed bottom-24 right-5 w-80 max-w-full h-[400px] bg-white border shadow-lg rounded-xl z-50 flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white p-3 font-semibold flex justify-between items-center">
            Support Chat
            <button onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto">
            {/* Chat messages will appear here */}
            <p className="text-gray-500 text-sm">
              Hello! How can we help you today?
            </p>
          </div>
          <div className="p-3 border-t flex">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-l px-3 py-2 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
