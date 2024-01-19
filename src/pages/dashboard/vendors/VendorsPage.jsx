import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import { allVendors } from "../../../helpers/redux/vendors";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { Link } from "react-router-dom";

const VendorPage = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const dispatch = useDispatch();
  const allStateVendors = useSelector((state) => state.vendors.vendors);

  const getAllVendors = async () => {
    await allVendors(dispatch, setLoading);
  };

  useEffect(() => {
    getAllVendors();
  }, [userId]);

  useEffect(() => {
    setVendors(allStateVendors);
  }, [allStateVendors]);

  return (
    <Layout>
      <div className="CRTable">
        <table>
          <tr>
            <th>Image</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Occupation</th>
            <th>Education</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Revenue</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            vendors &&
            vendors.length > 0 &&
            vendors.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={
                        item?.avatar?.doc || "/assets/images/placeholder.jpeg"
                      }
                      alt="user"
                      className={styles.profileImage}
                    />
                  </td>
                  <td>{item?.username}</td>
                  <td>{item?.phone}</td>
                  <td>{item?.email}</td>
                  <td>{item?.occupation}</td>
                  <td>{item?.educationLevel}</td>
                  <td>
                    <Link to={item?.resume.doc} target="_blank">
                      Click to view
                    </Link>
                  </td>
                  <td
                    style={
                      item.status === "pending"
                        ? { color: "#f4f124" }
                        : item.status === "rejected"
                          ? { color: "red" }
                          : { color: "green" }
                    }
                  >
                    {item?.status}
                  </td>
                  <td>{item?.totalRevenue}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                  <td>
                    <button className={styles.actionBtn}>Approve</button>
                    <button className={styles.actionBtnDecline}>Decline</button>
                  </td>
                </tr>
              );
            })
          )}
        </table>
      </div>
    </Layout>
  );
};

export default VendorPage;
