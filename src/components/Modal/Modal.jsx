import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./modalstyles.module.css";
import { createResourseType } from "../../helpers/redux/resourseTypes";
import { createFaculty } from "../../helpers/redux/faculties";
import { createDepartment } from "../../helpers/redux/departments";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function ModalComponent({ action }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [schools, setSchools] = useState("");
  const [faculties, setFaculties] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [loading, setLoading] = useState(false);

  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );
  const allStateFaculties = useSelector((state) => state.faculties.faculties);

  useEffect(() => {
    setSchools(resourceTypeState);
  }, [resourceTypeState]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      if (title) {
        const data = {
          title,
          schoolId: selectedSchool,
          facultyId: selectedFaculty,
        };
        const response =
          action === "exams"
            ? await createResourseType(data, dispatch, setLoading)
            : action === "faculties"
              ? await createFaculty(data, dispatch, setLoading)
              : await createDepartment(data, dispatch, setLoading);
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
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {action === "exams"
              ? "Exam/school"
              : action === "departments"
                ? "Department"
                : "faculties"
                  ? "Faculty"
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
                  <option>Loading Exams/schools ...</option>
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {loading ? "Loading ..." : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
