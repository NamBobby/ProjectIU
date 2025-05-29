import React, { useContext, useEffect } from "react";
import { HomeOutlined, UserOutlined, ExportOutlined } from "@ant-design/icons";
import { Button, Dropdown, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getAccountApi } from "../services/apiService";
import { AuthContext } from "./auth.context";
import "../assets/styles/header.css";
import axios from "../services/axios.customize";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setAuth({ isAuthenticated: false, user: { email: "", name: "" } });
    notification.success({ message: "Logout Successful" });
    navigate("/");
  };

  useEffect(() => {
    const handleAuthUpdate = async () => {
      try {
        const response = await getAccountApi();
        if (response && Array.isArray(response) && response.length > 0) {
          const updatedUser = response[0];
          setAuth({
            isAuthenticated: true,
            user: {
              ...updatedUser,
              avatarPath: updatedUser.avatarPath || null,
            },
          });
        } else {
          setAuth({ isAuthenticated: false, user: { email: "", name: "" } });
        }
      } catch (error) {
        console.error("Error fetching updated user data:", error);
      }
    };

    window.addEventListener("authUpdate", handleAuthUpdate);

    return () => {
      window.removeEventListener("authUpdate", handleAuthUpdate);
    };
  }, [setAuth]);

  const items = auth.isAuthenticated
    ? [
        {
          key: "profile",
          label: (
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            >
              {auth.user.name}
              <ExportOutlined className="export-icon" />
            </div>
          ),
        },
        {
          key: "userInfo",
          label: (
            <div
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate("/userInfo", { state: { user: auth.user } })
              }>
              {"Dashboards"}
            </div>
          ),
        },
        {
          key: "logout",
          label: (
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          ),
        },
      ].filter(Boolean)
    : [
        {
          key: "login",
          label: (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          ),
        },
        {
          key: "register",
          label: (
            <Link to="/register" className="signup-btn">
              Sign Up
            </Link>
          ),
        },
      ];

  return (
    <div className="header-container">
      <div className="logo">
          <Link to="/">
            <HomeOutlined className="home-icon" />
          </Link>
        </div>

      <div className="auth-buttons">
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button
            icon={
              auth?.user?.avatarPath ? (
                <img
                  src={`${
                    axios.defaults.baseURL
                  }/uploads/${auth.user.avatarPath.replace(/^src[\\/]/, "")}`}
                  alt={auth?.user?.name || "User Avatar"}
                  className="avatar-image"
                />
              ) : (
                <UserOutlined />
              )
            }
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;