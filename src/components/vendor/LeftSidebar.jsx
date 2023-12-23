import React, { useState, useContext } from "react";
import { RouteContext } from "../../context/NavigationContext";
import { Link } from "react-router-dom";

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
    link: "/cash-out",
  },
  {
    title: "Logout",
    link: "/logout",
  },
];

const LeftSidebar = () => {
  const [selected, setSelected] = useState({ title: "Home" });
  const { setSelectedRoute } = useContext(RouteContext);
  return (
    <div>
      <div className="brand">
        <img src="/assets/images/image1.jpg" alt="OutShine Logo" />
        <p>OutShine</p>
      </div>
      <h4 className="leftsidebarNavTitle">Actions</h4>
      <ul>
        {navItems.map((item, index) => (
          <Link
            onClick={() => setSelected(item)}
            to={item.link}
            key={index}
            className={
              selected && selected.title === item.title
                ? "leftsidebarNavItems selectedNavItem"
                : "leftsidebarNavItems"
            }
          >
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
