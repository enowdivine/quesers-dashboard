import React from "react";
import "../styles/GlobalStyles.css";
import "../styles/VendorStyles.css";
import LeftSidebar from "../components/vendor/LeftSidebar";
import RightSidebar from "../components/vendor/RightSidebar";
import TopNav from "../components/vendor/TopNav";
import MainContent from "../components/vendor/MainContent";

const VendorLayout = () => {
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

export default VendorLayout;
