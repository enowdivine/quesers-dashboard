import React, { useContext, useEffect, useState } from "react";
import Cards from "../Cards";
import Document from "../Document";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  getVendorDocs,
  getAllDocs,
  getAllSalesCount,
  getVendorSalesCount,
} from "../../helpers/redux/resources";
import { getVendorDetails } from "../../helpers/redux/vendors";
import { useDispatch, useSelector } from "react-redux";

const MainContent = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [selected, setSelected] = useState("");
  const [revenue, setRevenue] = useState("");
  const allDocs = useSelector((state) => state.resource.resources);
  const saleCounts = useSelector((state) => state.resource.saleCounts);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllDocuments = async () => {
      if (role === "admin") {
        await getAllDocs(dispatch, setLoading);
        await getAllSalesCount(dispatch, setLoading);
      } else {
        await getVendorDocs(userId, dispatch, setLoading);
        await getVendorSalesCount(userId, dispatch, setLoading);
        const response = await getVendorDetails(userId, dispatch, setLoading);
        const user = response.message.payload;
        setRevenue(user?.totalRevenue);
      }
    };

    getAllDocuments();
  }, [userId, dispatch]);

  const filterDoc = () => {
    const result = allDocs.filter((item) => item.status === selected);
    setDocs(result);
  };

  useEffect(() => {
    filterDoc();
  }, [selected]);

  useEffect(() => {
    setDocs(allDocs);
  }, [allDocs]);

  const stats = [
    {
      title: "Sales",
      value: saleCounts?.totalSaleCount,
      desc: "",
    },
    {
      title: "Gains",
      value: role === "admin" ? saleCounts?.totalRevenue : revenue,
      desc: "FCFA",
    },
    {
      title: "Uploads",
      value: allDocs?.length,
      desc: "Papers",
    },
    {
      title: "Reviews",
      value: 2318,
      desc: "4.5 Stars",
    },
  ];

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
              onChange={(e) => setSelected(e.target.value)}
            >
              <option>Filter</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          ) : (
            "Uploads"
          )}
        </h4>
      </div>
      <div className="docs">
        {loading ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            Loading...
          </div>
        ) : (
          docs.length > 0 &&
          docs.map((item, index) => (
            <Link to={`/doc-details/${item._id}/${item.vendorId}`} key={index}>
              <Document
                key={index}
                title={item.title}
                color={
                  item.status === "pending"
                    ? "#f4f124"
                    : item.status === "rejected"
                      ? "red"
                      : "green"
                }
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MainContent;
