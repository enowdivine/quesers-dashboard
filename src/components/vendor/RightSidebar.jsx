import React, { useState, useContext } from "react";
import Cards from "../Cards";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const FormStyle = {
  width: "100%",
  border: "1px solid #ccc",
  background: "#f0efef",
  padding: 10,
  borderRadius: 5,
  marginTop: 10,
  outline: "none",
};
const BtnStyle = {
  color: "#fff",
  background: "black",
  width: "100%",
  padding: 5,
  fontWeight: "bold",
  marginTop: 15,
  borderRadius: 5,
};
const navItems = [
  {
    title: "Home",
    link: "/dashboard",
  },
];
const RightSidebar = () => {
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState({ title: "Home" });
  const { setAuthenticated, role } = useContext(AuthContext);
  console.log(selected);

  const handleLogout = () => {
    localStorage.removeItem("quesers-admin");
    setAuthenticated(false);
  };

  return (
    <div>
      {role === "vendor" && (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/assets/images/image2.jpg"
              alt="Profile"
              style={{
                borderRadius: "50%",
                width: 200,
                padding: 6,
                background:
                  "linear-gradient(45deg, rgba(73,152,153,1) 0%, rgba(192,253,45,1) 100%)",
              }}
            />
          </div>
          <p style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}>
            Martha Sagasta
          </p>
          <div style={{ marginTop: 20 }}>
            <h4 style={{ fontWeight: "bold" }}>Your Account</h4>
            <div style={{ marginTop: 10 }}>
              <Cards
                title={"Gains"}
                value={3671}
                desc={"CFA"}
                color={"#dcecf2"}
              />
            </div>
            {showForm && (
              <div>
                <input type="number" placeholder="Amount" style={FormStyle} />
                <input
                  type="password"
                  placeholder="**********"
                  style={FormStyle}
                />
              </div>
            )}
            {!showForm && (
              <button style={BtnStyle} onClick={() => setShowForm(!showForm)}>
                CASHOUT
              </button>
            )}
            {showForm ? <button style={BtnStyle}>SUBMIT </button> : ""}
          </div>
        </div>
      )}
      {role === "admin" && (
        <div>
          <h4 style={{ fontWeight: "bold" }}>MENU</h4>
          <ul sty>
            {navItems.map((item, index) => (
              <Link
                key={index}
                onClick={() => setSelected(item)}
                to={item.link}
                className="rightsidebarNavItems"
              >
                {item.title}
              </Link>
            ))}
            <Link onClick={handleLogout} className="rightsidebarNavItems">
              Logout
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
