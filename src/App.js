import React from "react";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import Upload from "./pages/dashboard/Upload";
import CashoutRequest from "./pages/dashboard/cashoutRequestPages/CashoutRequest";
import VendorPage from "./pages/dashboard/vendors/VendorsPage";
import PageError from "./pages/PageError";
import DocDetails from "./pages/dashboard/DocDetails";
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
          <Route path="/vendors" element={<VendorPage />} />

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
