import React, { useState, useContext, useEffect } from "react";
import Layout from "../../../layouts/Layout";
import styles from "./styles.module.css";
import {
  getAllCategories,
  deleteHandler,
} from "../../../helpers/redux/categories";
import { getAllExams } from "../../../helpers/redux/exams";
import { getAllDepartments } from "../../../helpers/redux/departments";
import { getAllFaculties } from "../../../helpers/redux/faculties";
import { getAllResourceTypes } from "../../../helpers/redux/resourseTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import moment from "moment";
import ModalComponent from "../../../components/Modal/Modal";
import { toast } from "react-toastify";

const ListCategories = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [courses, setCourses] = useState([]);
  const dispatch = useDispatch();
  const categoriesStates = useSelector((state) => state.categories.categories);
  const faculties = useSelector((state) => state.faculties.faculties);
  const exams = useSelector((state) => state.exams.exams);
  const departments = useSelector((state) => state.departments.departments);
  const schools = useSelector((state) => state.resourceType.resourceTypes);

  const resourceTypes = async () => {
    await getAllResourceTypes(dispatch, setLoading);
    await getAllExams(dispatch, setLoading);
    await getAllDepartments(dispatch, setLoading);
    await getAllCategories(dispatch, setLoading);
    await getAllFaculties(dispatch, setLoading);
  };

  const handleDelete = async (item) => {
    var result = window.confirm(
      `Are you sure you want to delete ${item.title}?`
    );
    if (result) {
      const response = await deleteHandler(item, dispatch, setLoading);
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
    resourceTypes();
  }, [userId]);

  useEffect(() => {
    setCourses(categoriesStates);
  }, [categoriesStates]);

  return (
    <Layout>
      <div className={styles.headingTitle}>
        <h5>List Of Courses</h5>
        <ModalComponent
          action="categories"
          item={editItem}
          editShow={editCategory}
          editClose={setEditCategory}
        />
      </div>
      <div className="CRTable">
        <table>
          <tr>
            <th>Name</th>
            <th>School/Exam</th>
            <th>Faculty</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Level</th>
            <th>Date</th>
            {role === "admin" && <th>Action</th>}
          </tr>
          {loading ? (
            <tr>
              <td colSpan={8}>Loading...</td>
            </tr>
          ) : (
            courses?.length > 0 &&
            courses.map((item, index) => {
              const school = () => {
                if (item.schoolId) {
                  return schools?.filter(
                    (schl) => schl._id === item.schoolId
                  )[0];
                } else {
                  return exams?.filter((ex) => ex._id === item.examId)[0];
                }
              };
              const faculty = faculties?.filter(
                (fac) => fac._id === item.facultyId
              )[0];
              const department = departments?.filter(
                (dept) => dept._id === item.departmentId
              )[0];
              const semester = item.semester === "first" ? "1st" : "2nd";
              return (
                <tr key={index}>
                  <td>{item?.title}</td>
                  <td>{school()?.title}</td>
                  <td>{faculty?.title || "--"}</td>
                  <td>{department?.title || "--"}</td>
                  <td>{semester || "--"}</td>
                  <td>{item?.level || "--"}</td>
                  <td>{moment(item?.createdAt).format("DD-MM-YYYY HH:mm")}</td>
                  <td>
                    <button
                      className={styles.actionBtn}
                      onClick={() => {
                        setEditCategory(!editCategory);
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

export default ListCategories;
