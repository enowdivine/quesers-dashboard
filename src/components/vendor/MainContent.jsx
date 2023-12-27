import React, { useContext } from "react";
import Cards from "../Cards";
import Document from "../Document";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Downloads",
    value: 7265,
    desc: "",
  },
  {
    title: "Gains",
    value: 3671,
    desc: "CFA",
  },
  {
    title: "Uploads",
    value: 15,
    desc: "Papers",
  },
  {
    title: "Reviews",
    value: 2318,
    desc: "4.5 Stars",
  },
];

const docs = [
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "pending",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "rejected",
  },
  {
    title: "Ordinary Level Physics for beginners",
    status: "approved",
  },
];

const MainContent = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="vendorMainContent">
      <div className="heading">
        <h4 style={{ fontWeight: "bold" }}>Overview</h4>
        <select
          style={{ outline: "none", padding: "5px 10px", borderRadius: 5 }}
        >
          <option>Today</option>
          <option>Past Week</option>
          <option>Past Two Weeks</option>
          <option>Past Month</option>
        </select>
      </div>
      <div className="statistics">
        {stats.map((item, index) => (
          <Cards
            key={index}
            title={item.title}
            value={item.value}
            desc={item.desc}
            color={index % 2 === 1 ? "#dee3e3" : "#dcecf2"}
            width={"25%"}
            margin={15}
          />
        ))}
      </div>
      <div className="heading">
        <h4 style={{ fontWeight: "bold", marginTop: 30 }}>
          {role === "admin" ? (
            <select
              style={{ outline: "none", padding: "5px 10px", borderRadius: 5 }}
            >
              <option>Filter</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          ) : (
            "Uploads"
          )}
        </h4>
      </div>
      <div className="docs">
        {docs.map((item, index) => (
          <Link style={{ width: "20%" }} to={`/doc-details/${index}`}>
            <Document
              key={index}
              title={item.title}
              color={
                item.status === "pending"
                  ? "yellow"
                  : item.status === "rejected"
                    ? "red"
                    : "green"
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
