import React, { useContext } from "react";
import { MdOutlineSpaceDashboard, MdOutlineWbSunny } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { RouteContext } from "../../context/NavigationContext";

const TopNav = () => {
  const { selectedRoute } = useContext(RouteContext);

  return (
    <div className="vendorTopNav">
      <div className="breadcrumb">
        <div>
          <MdOutlineSpaceDashboard size={20} className="mr-3" />
        </div>
        <div>
          <FaRegStar size={20} className="mr-3" />
        </div>
        <div>
          <span className="logo mr-1">OUTSHINE</span>{" "}
          <span className="mr-5">Dashboard</span> /
          <span className="ml-5">{selectedRoute}</span>
        </div>
      </div>
      <div className="options">
        <div className="">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search"
            autocomplete="name"
            className="searchInput"
          />
        </div>
        <MdOutlineWbSunny size={20} className="ml-3" />
        <FiBell size={20} className="ml-3" />
        <MdOutlineSpaceDashboard size={20} className="ml-3" />
      </div>
    </div>
  );
};

export default TopNav;
