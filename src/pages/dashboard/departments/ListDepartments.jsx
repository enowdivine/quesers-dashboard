import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import {
  getAllDepartments,
  deleteDepartment,
} from "../../../helpers/redux/departments";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";
import { toast } from "react-toastify";

const ListDepartments = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editDepartment, setEditDepartment] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [schools, setSchools] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const allStateDepartments = useSelector(
    (state) => state.departments.departments
  );
  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );
  const allStateFaculties = useSelector((state) => state.faculties.faculties);

  const allDepartments = async () => {
    await getAllDepartments(dispatch, setLoading);
  };

  const handleDelete = async (item) => {
    var result = window.confirm(
      `Are you sure you want to delete ${item.title}?`
    );
    if (result) {
      const response = await deleteDepartment(item, dispatch, setLoading);
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
    allDepartments();
  }, [userId]);

  useEffect(() => {
    setSchools(resourceTypeState);
  }, [resourceTypeState]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  useEffect(() => {
    setDepartments(allStateDepartments);
  }, [allStateDepartments]);

  return (
    <Layout>
      <div className={styles.headingTitle}>
        <h5>List Of Departments</h5>
        <ModalComponent
          action="departments"
          item={editItem}
          editShow={editDepartment}
          editClose={setEditDepartment}
        />
      </div>
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
              let fclty = faculties.filter(
                (fclty) => fclty._id === item.facultyId
              )[0];
              let schl = schools.filter(
                (schl) => schl._id === fclty.schoolId
              )[0];
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{fclty?.title}</td>
                  <td>{schl?.title}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        setEditDepartment(!editDepartment);
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

export default ListDepartments;
