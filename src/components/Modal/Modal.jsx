import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./modalstyles.module.css";
import {
  getAllResourceTypes,
  createResourseType,
  updateResourseType,
} from "../../helpers/redux/resourseTypes";
import { getAllExams } from "../../helpers/redux/exams";
import {
  getAllFaculties,
  createFaculty,
  updateFaculty,
} from "../../helpers/redux/faculties";
import {
  getAllDepartments,
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
  const [exams, setExams] = useState([]);
  const [schools, setSchools] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [courseType, setCourseType] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const examStates = useSelector((state) => state.exams.exams);
  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );
  const allStateFaculties = useSelector((state) => state.faculties.faculties);
  const allStateDepartments = useSelector(
    (state) => state.departments.departments
  );

  const getRequiredData = async () => {
    if (action === "faculties" || action === "categories") {
      await getAllResourceTypes(dispatch, setLoading);
    }
    if (action === "departments" || action === "categories") {
      await getAllFaculties(dispatch, setLoading);
    }
    if (action === "categories") {
      await getAllDepartments(dispatch, setLoading);
      await getAllExams(dispatch, setLoading);
    }
  };

  const setEditItem = async () => {
    if (editShow) {
      setTitle(item.title);
      setSelectedExam(item?.examId);
      setSelectedSchool(item?.schoolId);
      setSelectedFaculty(item?.facultyId);
      setSelectedDepartment(item?.departmentId);
      setLevel(item?.level);
      setSemester(item?.semester);
      setCourseType(item?.examId || item?.schoolId);
    }
  };

  useEffect(() => {
    setEditItem();
  }, [item]);

  useEffect(() => {
    getRequiredData();
  }, []);

  useEffect(() => {
    setExams(examStates);
  }, [examStates]);

  useEffect(() => {
    setSchools(resourceTypeState);
  }, [resourceTypeState]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  useEffect(() => {
    setDepartments(allStateDepartments);
  }, [allStateDepartments]);

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
          examId: selectedExam,
          schoolId: selectedSchool,
          facultyId: selectedFaculty,
          departmentId: selectedDepartment,
          level,
          semester,
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
            {action === "categories" && (
              <>
                <select
                  style={{ marginTop: 10 }}
                  className={styles.selectField}
                  value={courseType}
                  onChange={(e) => setCourseType(e.target.value)}
                >
                  <option>Select Exam Type</option>
                  <option value="concour">Concour/High School Exam</option>
                  <option value="university">University Exam</option>
                </select>
                {courseType === "concour" && (
                  <select
                    className={styles.selectField}
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                  >
                    <option>Select Exam</option>
                    {exams.length > 0 ? (
                      exams.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.title}
                        </option>
                      ))
                    ) : (
                      <option>Loading Exams ...</option>
                    )}
                  </select>
                )}
                {courseType === "university" && (
                  <>
                    <select
                      className={styles.selectField}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                    >
                      <option>Select school</option>
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
                    <select
                      value={selectedFaculty}
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
                    <select
                      className={styles.selectField}
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option>Department</option>
                      {departments.length > 0 ? (
                        departments.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.title}
                          </option>
                        ))
                      ) : (
                        <option>Loading Departments ...</option>
                      )}
                    </select>
                    <select
                      className={styles.selectField}
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      <option>Level</option>
                      <option value={200}>200</option>
                      <option value={300}>300</option>
                      <option value={400}>400</option>
                      <option value={500}>500</option>
                      <option value={600}>600</option>
                    </select>
                    <select
                      className={styles.selectField}
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                    >
                      <option>Semester</option>
                      <option value={"first"}>First Semester</option>
                      <option value={"second"}>Second Semester</option>
                    </select>
                  </>
                )}
              </>
            )}
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
