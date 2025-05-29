import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../App.jsx";
import RegisterPage from "../containers/auth/register.jsx";
import LoginPage from "../containers/auth/login.jsx";
import HomePage from "../containers/homePage/home.jsx";
import UserAccount from "../containers/userPage/userAccount.jsx";
import UserInfo from "../containers/userPage/userInfo.jsx";
import SendOtpPage from "../containers/auth/sendotp.jsx";
import ResetPasswordPage from "../containers/auth/resetPassword.jsx";
import NotFoundPage from "../components/notfoundPage.jsx";

// Simplified Router
const RoleBasedRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "userInfo", element: <UserInfo /> },
      ],
    },
    { path: "/profile", element: <UserAccount /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/forgot-password", element: <SendOtpPage /> },
    { path: "/resetpassword", element: <ResetPasswordPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <NotFoundPage /> },
  ]);

  return <RouterProvider router={router} />;
};

export default RoleBasedRouter;