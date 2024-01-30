import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./modalstyles.module.css";
import {
  getAllResourceTypes,
  createResourseType,
  updateResourseType,
} from "../../helpers/redux/resourseTypes";
import {
  getAllFaculties,
  createFaculty,
  updateFaculty,
} from "../../helpers/redux/faculties";
import {
  createDepartment,
  updateDepartment,
} from "../../helpers/redux/departments";
import { createExam, updateExam } from "../../helpers/redux/exams";
import { createCategory, updateCategory } from "../../helpers/redux/categories";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function ModalComponent({ action, item, editShow, editClose }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [schools, setSchools] = useState("");
  const [faculties, setFaculties] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );
  const allStateFaculties = useSelector((state) => state.faculties.faculties);

  const getRequiredData = async () => {
    await getAllResourceTypes(dispatch, setLoading);
    await getAllFaculties(dispatch, setLoading);
  };

  const setEditItem = async () => {
    if (editShow) {
      setTitle(item.title);
    }
  };

  useEffect(() => {
    setEditItem();
  }, [item]);

  useEffect(() => {
    getRequiredData();
  }, []);

  useEffect(() => {
    setSchools(resourceTypeState);
  }, [resourceTypeState]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  const handleClose = () => {
    setShow(false);
    editClose(false);
    setTitle("");
  };
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      if (title) {
        const data = {
          id: item?._id,
          title,
          schoolId: selectedSchool,
          facultyId: selectedFaculty,
        };
        const response = editShow
          ? action === "schools"
            ? await updateResourseType(data, dispatch, setLoading)
            : action === "faculties"
              ? await updateFaculty(data, dispatch, setLoading)
              : action === "departments"
                ? await updateDepartment(data, dispatch, setLoading)
                : action === "exams"
                  ? await updateExam(data, dispatch, setLoading)
                  : await updateCategory(data, dispatch, setLoading)
          : action === "schools"
            ? await createResourseType(data, dispatch, setLoading)
            : action === "faculties"
              ? await createFaculty(data, dispatch, setLoading)
              : action === "departments"
                ? await createDepartment(data, dispatch, setLoading)
                : action === "exams"
                  ? await createExam(data, dispatch, setLoading)
                  : await createCategory(data, dispatch, setLoading);
        if (response.status === "error") {
          toast.error(response.res.payload);
          return;
        } else {
          toast.success(response.message.payload.message);
          handleClose();
          return;
        }
      } else {
        toast.error("Field is empty");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className={styles.createBtn} onClick={handleShow}>
        Create
      </button>

      <Modal
        show={show || editShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "schools"
              ? "School"
              : action === "departments"
                ? "Department"
                : action === "faculties"
                  ? "Faculty"
                  : action === "exams"
                    ? "Exam"
                    : ""}
            {"  "}
            Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="">
            {action === "faculties" && (
              <select
                className={styles.selectField}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option>Select Exam/school</option>
                {schools.length > 0 ? (
                  schools.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))
                ) : (
                  <option>Loading Schools ...</option>
                )}
              </select>
            )}
            {action === "departments" && (
              <select
                className={styles.selectField}
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                <option>Select Faculty</option>
                {faculties.length > 0 ? (
                  faculties.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.title}
                    </option>
                  ))
                ) : (
                  <option>Loading Faculties ...</option>
                )}
              </select>
            )}
            <input
              type="text"
              placeholder="Enter name"
              className={styles.inputField}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className={styles.cancelBtn} onClick={handleClose}>
            Close
          </button>
          <button className={styles.createBtn} onClick={handleSubmit}>
            {loading ? "Loading ..." : editShow ? "Update" : "Submit"}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
