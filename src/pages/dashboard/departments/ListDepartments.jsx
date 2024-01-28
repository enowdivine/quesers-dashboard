import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import { getAllDepartments } from "../../../helpers/redux/departments";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";

const ListDepartments = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const allStateDepartments = useSelector(
    (state) => state.departments.departments
  );
  console.log(allStateDepartments);

  const allDepartments = async () => {
    await getAllDepartments(dispatch, setLoading);
  };

  useEffect(() => {
    allDepartments();
  }, [userId]);

  useEffect(() => {
    setDepartments(allStateDepartments);
  }, [allStateDepartments]);

  return (
    <Layout>
      <ModalComponent action="departments" />
      <div className="CRTable">
        <table>
          <tr>
            <th>Name</th>
            <th>Faculty</th>
            <th>School</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            departments &&
            departments.length > 0 &&
            departments.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{item?.facultyId}</td>
                  <td>{item?.facultyId}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                  <td>
                    <button className={styles.actionBtn}>Edit</button>
                    <button className={styles.actionBtnDecline}>Delete</button>
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

export default ListDepartments;
