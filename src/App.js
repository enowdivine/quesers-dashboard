import React from "react";
import Login from "./pages/auth/Login";
import Home from "./pages/vendor/Home";
import Upload from "./pages/vendor/Upload";
import CashoutRequest from "./pages/vendor/CashoutRequest";
import PageError from "./pages/PageError";
import DocDetails from "./pages/vendor/DocDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/create" element={<Upload />} />
          <Route path="/requests" element={<CashoutRequest />} />
          <Route path="/doc-details/:id" element={<DocDetails />} />

          {/* 404 ROUTE */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
      {/* USING THE TOASTIFY CONTAINER */}
      <ToastContainer />
    </div>
  );
}

export default App;
