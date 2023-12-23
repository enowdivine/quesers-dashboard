import React from "react";
import LeftSidebar from "../components/vendor/LeftSidebar";
import RightSidebar from "../components/vendor/RightSidebar";
import TopNav from "../components/vendor/TopNav";

const VendorLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="leftsidebar">
        <LeftSidebar />
      </div>
      <div className="maincontent">
        <div className="topnav">
          <TopNav />
        </div>
        <div className="contentsection">{children}</div>
      </div>
      <div className="rightsidebar">
        <RightSidebar />
      </div>
    </div>
  );
};

export default VendorLayout;
