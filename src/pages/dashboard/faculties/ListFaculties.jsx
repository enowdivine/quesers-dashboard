import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import {
  getAllFaculties,
  deleteFaculty,
} from "../../../helpers/redux/faculties";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";
import { toast } from "react-toastify";

const ListFaculties = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editFaculty, setEditFaculty] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [schools, setSchools] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const dispatch = useDispatch();
  const allStateFaculties = useSelector((state) => state.faculties.faculties);
  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );

  const getFaculties = async () => {
    await getAllFaculties(dispatch, setLoading);
  };

  const handleDelete = async (item) => {
    var result = window.confirm(
      `Are you sure you want to delete ${item.title}?`
    );
    if (result) {
      const response = await deleteFaculty(item, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        return;
      }
    } else {
      console.log("Logout canceled.");
      return;
    }
  };

  useEffect(() => {
    getFaculties();
  }, [userId]);

  useEffect(() => {
    setSchools(resourceTypeState);
  }, [resourceTypeState]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  return (
    <Layout>
      <ModalComponent
        action="faculties"
        item={editItem}
        editShow={editFaculty}
        editClose={setEditFaculty}
      />
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
              let schl = schools.filter(
                (schl) => schl._id === item.schoolId
              )[0];
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{schl?.title}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        setEditFaculty(!editFaculty);
                        setEditItem(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.actionBtnDecline}
                      onClick={() => handleDelete(item)}
                    >
                      Delete
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

export default ListFaculties;
