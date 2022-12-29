import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ChatProvider>
        <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
        </React.StrictMode>
    </ChatProvider>
  </AuthProvider>
);
