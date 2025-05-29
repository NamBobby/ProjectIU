import React, { useState, useEffect } from "react";
import Header from "./components/header";
import { Outlet } from "react-router-dom";
import "./global.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <div className="app-container">
        <div className="main-content">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
