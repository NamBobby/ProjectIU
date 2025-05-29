import React, { useState, useEffect, useRef, useContext } from "react";
import { Input, Button, notification } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { AuthContext } from "./auth.context";
import { sendChatMessage } from "../services/apiService";
import "../assets/styles/chat.css"; 

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { auth } = useContext(AuthContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const userId = auth.isAuthenticated ? auth.user.userId : null;
      const response = await sendChatMessage(inputMessage, userId);

      const botMessage = {
        text: response.reply,
        sender: "bot",
        timestamp: new Date().toISOString(),
        sentiment: response.sentiment,
        intent: response.intent
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      notification.error({
        message: "Error",
        description: "Could not get a response from the chatbot.",
      });

      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I had a problem processing your message. Please try again.",
          sender: "bot",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Chatbot Assistant For Customer Service</h2>
        {auth.isAuthenticated ? (
          <div className="user-status">Connected as: {auth.user.name}</div>
        ) : (
          <div className="user-status">Guest Mode</div>
        )}
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="welcome-message">
            <h3>Welcome to our AI Chatbot!</h3>
            <p>Ask a question to get started.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-content">{msg.text}</div>
              {msg.sender === "bot" && msg.sentiment && (
                <div className="message-metadata">
                  <span className={`sentiment ${msg.sentiment.toLowerCase()}`}>
                    {msg.sentiment}
                  </span>
                  {msg.intent && <span className="intent">{msg.intent}</span>}
                </div>
              )}
            </div>
          ))
        )}
        {isLoading && (
          <div className="bot-message loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <Input
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          disabled={isLoading}
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;