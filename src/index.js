import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/styles/GlobalStyles.css";
import "../src/styles/AuthStyles.css";
import "../src/styles/AdminStyles.css";
import "../src/styles/VendorStyles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContext from "./context/AuthContext";
import RouteContext from "./context/NavigationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContext>
      <RouteContext>
        <App />
      </RouteContext>
    </AuthContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
