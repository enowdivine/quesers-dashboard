import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import { getAllResourceTypes } from "../../../helpers/redux/resourseTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";

const ListSchools = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [rsType, setRsType] = useState([]);
  const dispatch = useDispatch();
  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );

  const resourceTypes = async () => {
    await getAllResourceTypes(dispatch, setLoading);
  };

  useEffect(() => {
    resourceTypes();
  }, [userId]);

  useEffect(() => {
    setRsType(resourceTypeState);
  }, [resourceTypeState]);

  return (
    <Layout>
      <ModalComponent action="exams" />
      <div className="CRTable">
        <table>
          <tr>
            <th>Name</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            rsType.length > 0 &&
            rsType.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
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

export default ListSchools;
