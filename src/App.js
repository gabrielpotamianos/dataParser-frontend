import LoginPage from "./LoginPage.js";
import "./App.css";
import { login } from "./api";
import React, { useState } from "react";
import MainPage from "./components/MainPage.js";

function getInitialAuth() {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  const valid = token && expiresAt && new Date(expiresAt) > new Date();
  return {
    token: valid ? token : null,
    loggedIn: !!(token && valid),
  };
}

function App() {
  const { token: savedToken, loggedIn: initialLoggedIn } = getInitialAuth();

  const [token, setToken] = useState(savedToken);
  const [loggedIn, setLoggedIn] = useState(initialLoggedIn);

  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password);
      if (data?.token?.trim()) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("expiresAt", data.expires_at);
        setToken(data.token);
        setLoggedIn(true);
      }
    } catch (e) {
      console.error("Login failed", e);
    }
  };

  return loggedIn ? <MainPage token={token} /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
