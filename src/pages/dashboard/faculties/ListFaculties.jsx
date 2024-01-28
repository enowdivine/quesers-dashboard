import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import { getAllFaculties } from "../../../helpers/redux/faculties";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";

const ListFaculties = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [faculties, setFaculties] = useState([]);
  const dispatch = useDispatch();
  const allStateFaculties = useSelector((state) => state.faculties.faculties);

  const getFaculties = async () => {
    await getAllFaculties(dispatch, setLoading);
  };

  useEffect(() => {
    getFaculties();
  }, [userId]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  return (
    <Layout>
      <ModalComponent action="faculties" />
      <div className="CRTable">
        <table>
          <tr>
            <th>Name</th>
            <th>School</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={6}>Loading...</td>
            </tr>
          ) : (
            faculties &&
            faculties.length > 0 &&
            faculties.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{item?.schoolId}</td>
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

export default ListFaculties;
