import React from "react";
import { Button } from "antd";
import ChatComponent from "../../components/chatComponents";
import "../../assets/styles/home.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <ChatComponent />
    </div>
  );
};

export default HomePage;