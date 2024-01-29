import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import { allVendors, updateVendorStatus } from "../../../helpers/redux/vendors";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const VendorPage = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const dispatch = useDispatch();
  const allStateVendors = useSelector((state) => state.vendors.vendors);

  const getAllVendors = async () => {
    await allVendors(dispatch, setLoading);
  };

  const updateStatus = async (item) => {
    var result = window.confirm(
      `Are you sure you want to approve ${item.name}?`
    );
    if (result) {
      const data = {
        id: item.id,
        status: item.status,
      };
      const response = await updateVendorStatus(data, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        return;
      }
    } else {
      return;
    }
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
              <td colSpan={10}>Loading...</td>
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
                    <button
                      className={styles.actionBtn}
                      onClick={() =>
                        updateStatus({
                          id: item._id,
                          name: item.username,
                          status: "approved",
                        })
                      }
                    >
                      Approve
                    </button>
                    <button
                      className={styles.actionBtnDecline}
                      onClick={() =>
                        updateStatus({
                          id: item._id,
                          name: item.username,
                          status: "rejected",
                        })
                      }
                    >
                      Decline
                    </button>
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
