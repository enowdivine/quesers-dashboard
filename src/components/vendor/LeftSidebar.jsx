import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { GrDocumentText } from "react-icons/gr";
import { userLogout } from "../../helpers/redux/auth";
import { useDispatch } from "react-redux";

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

  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
    setAuthenticated(false);
  };

  return (
    <div>
      <div className="brand">
        <img src="/assets/images/image1.jpg" alt="OutShine Logo" />
        <p>OutShine</p>
      </div>
      <h4 className="leftsidebarNavTitle">Actions</h4>
      {role === "vendor" && (
        <ul>
          {navItems.map((item, index) => (
            <Link
              key={index}
              onClick={() => setSelected(item)}
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
          <Link onClick={handleLogout} className={"leftsidebarNavItems"}>
            Logout
          </Link>
        </ul>
      )}
      {role === "admin" && (
        <ul>
          {docsItems.map((item, index) => (
            <Link
              key={index}
              onClick={() => setSelected(item)}
              className={
                selected && selected.title === item.title
                  ? "leftsidebarNavItems selectedNavItem"
                  : "leftsidebarNavItems"
              }
              to={item.link}
            >
              <span style={{ display: "flex" }}>
                <GrDocumentText size={25} color={"green"} className="mr-1" />
                {item.title}
              </span>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LeftSidebar;
