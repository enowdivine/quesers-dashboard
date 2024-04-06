import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GrDocumentText } from "react-icons/gr";
import { userLogout } from "../../helpers/redux/auth";
import { useDispatch, useSelector } from "react-redux";

const navItems = [
  {
    title: "Home",
    link: "/dashboard",
  },
  {
    title: "Create",
    link: "/create",
  },
  {
    title: "Cashout Requests",
    link: "/requests",
  },
];

const docsItems = [
  {
    title: "Physics for Engineering",
    link: "/doc-details/1",
  },
  {
    title: "Mathematics 2",
    link: "/doc-details/1",
  },
  {
    title: "Physics for Engineering",
    link: "/doc-details/1",
  },
];

const LeftSidebar = () => {
  const [selected, setSelected] = useState({ title: "Home" });
  const { setAuthenticated, role } = useContext(AuthContext);
  const { vendor } = useParams();
  const [vendorDocs, setVendorDocs] = useState([]);
  const allDocs = useSelector((state) => state.resource.resources);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const selectedItem = [...navItems, ...docsItems].find(
      (item) => item.link === currentPath
    );
    setSelected(selectedItem);
  }, [location.pathname]);

  const handleLogout = () => {
    var result = window.confirm(`Are you sure you want to logout?`);
    if (result) {
      userLogout(dispatch);
      setAuthenticated(false);
    } else {
      return;
    }
  };

  useEffect(() => {
    const filterDocs = () => {
      const result = allDocs.filter((item) => item.vendorId === vendor);
      setVendorDocs(result);
    };
    filterDocs();
  }, [vendor]);

  return (
    <div>
      <Link to={"/"} className="brand">
        <img src="/assets/images/logo.png" alt="OutShine Logo" />
        <p>OutShine</p>
      </Link>
      <h4 className="leftsidebarNavTitle">Documents</h4>
      {role === "vendor" && (
        <ul>
          {navItems.map((item, index) => (
            <Link
              key={index}
              className={
                selected && selected.title === item.title
                  ? "leftsidebarNavItems selectedNavItem"
                  : "leftsidebarNavItems"
              }
              to={item.link}
            >
              {item.title}
            </Link>
          ))}
          <Link
            onClick={handleLogout}
            className={"leftsidebarNavItems text-danger"}
          >
            Logout
          </Link>
        </ul>
      )}
      {role === "admin" && (
        <ul className="leftsidebarNav">
          {vendorDocs.length > 0 ? (
            vendorDocs.map((item, index) => (
              <Link
                key={index}
                className={
                  selected && selected.title === item.title
                    ? "leftsidebarNavItems selectedNavItem"
                    : "leftsidebarNavItems"
                }
                to={`/doc-details/${item._id}/${item.vendorId}`}
              >
                <span style={{ display: "flex" }}>
                  <GrDocumentText size={25} color={"green"} className="mr-1" />
                  {item.title}
                </span>
              </Link>
            ))
          ) : (
            <span style={{ color: "#ccc" }}>No Document Selected</span>
          )}
        </ul>
      )}
    </div>
  );
};

export default LeftSidebar;
