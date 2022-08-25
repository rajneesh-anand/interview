import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AccountsContextProvider } from "./context/AccountContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AccountsContextProvider>
        <App />
      </AccountsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
