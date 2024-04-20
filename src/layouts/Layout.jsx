import React, { useContext, useEffect } from "react";
import LeftSidebar from "../components/dashboard/LeftSidebar";
import RightSidebar from "../components/dashboard/Rightsidebar/RightSidebar";
import TopNav from "../components/dashboard/TopNav";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const VendorLayout = ({ children }) => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
      return;
    }
  }, [authenticated, navigate]);

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
