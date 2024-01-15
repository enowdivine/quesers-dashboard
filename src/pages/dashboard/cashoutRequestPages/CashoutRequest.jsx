import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import {
  getVendorRequests,
  getAllCashoutRequests,
} from "../../../helpers/redux/withdrawals";
import { allVendors } from "../../../helpers/redux/vendors";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";

const CashoutRequest = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [vendors, setVendors] = useState([]);
  const dispatch = useDispatch();
  const allRequest = useSelector((state) => state.withdrawal.withdrawals);
  const allStateVendors = useSelector((state) => state.vendors.vendors);

  const getCashoutRequests = async () => {
    role === "admin"
      ? await getAllCashoutRequests(dispatch, setLoading)
      : await getVendorRequests(userId, dispatch, setLoading);
  };

  const getAllVendors = async () => {
    await allVendors(dispatch, setLoading);
  };

  useEffect(() => {
    getCashoutRequests();
    getAllVendors();
  }, [userId]);

  useEffect(() => {
    setRequests(allRequest);
  }, [allRequest]);

  useEffect(() => {
    setVendors(allStateVendors);
  }, [allStateVendors]);

  return (
    <Layout>
      <div className="CRTable">
        <table>
          <tr>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            requests &&
            requests.length > 0 &&
            requests.map((item, index) => {
              const vendor = vendors.filter((v) => v._id === item.userId)[0];
              return (
                <tr key={index}>
                  <td>{vendor?.username}</td>
                  <td>{vendor?.phone}</td>
                  <td>{vendor?.email}</td>
                  <td>{item?.amount}</td>
                  <td
                    style={
                      item.status === "pending"
                        ? { color: "#f4f124" }
                        : item.status === "declined"
                          ? { color: "red" }
                          : { color: "green" }
                    }
                  >
                    {item?.status}
                  </td>
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

export default CashoutRequest;
