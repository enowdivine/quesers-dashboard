import React from "react";
import "../styles/GlobalStyles.css";
import "../styles/AdminStyles.css";
import LeftSidebar from "../components/admin/LeftSidebar";
import RightSidebar from "../components/admin/RightSidebar";
import TopNav from "../components/admin/TopNav";
import MainContent from "../components/admin/MainContent";

const AdminLayout = () => {
  return (
    <div className="wrapper">
      <div className="leftsidebar">
        <LeftSidebar />
      </div>
      <div className="maincontent">
        <div className="topnav">
          <TopNav />
        </div>
        <div className="contentsection">
          <MainContent />
        </div>
      </div>
      <div className="rightsidebar">
        <RightSidebar />
      </div>
    </div>
  );
};

export default AdminLayout;
