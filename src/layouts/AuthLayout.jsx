import React from "react";
import Login from "../components/Login";
import "../styles/AuthStyles.css";

const AuthLayout = () => {
  return (
    <div className="wrapper">
      <div className="loginForm">
        <Login />
      </div>
    </div>
  );
};

export default AuthLayout;
