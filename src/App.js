import React from "react";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import Upload from "./pages/dashboard/Upload";
import ListExams from "./pages/dashboard/exams/ListExams";
import ListSchools from "./pages/dashboard/schools/ListSchools";
import ListFaculties from "./pages/dashboard/faculties/ListFaculties";
import ListDepartments from "./pages/dashboard/departments/ListDepartments";
import ListCategories from "./pages/dashboard/categories/ListCategories";
import CashoutRequest from "./pages/dashboard/cashoutRequestPages/CashoutRequest";
import VendorPage from "./pages/dashboard/vendors/VendorsPage";
import PageError from "./pages/PageError";
import DocDetails from "./pages/dashboard/DocDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

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
          <Route path="/exams" element={<ListExams />} />
          <Route path="/schools" element={<ListSchools />} />
          <Route path="/faculties" element={<ListFaculties />} />
          <Route path="/departments" element={<ListDepartments />} />
          <Route path="/categories" element={<ListCategories />} />

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
