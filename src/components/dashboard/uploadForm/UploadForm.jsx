import React, { useState, useContext, useEffect } from "react";
import styles from "./styles.module.css";
import { GrDocumentText } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../../context/AuthContext";
import {
  uploadDoc,
  updateDoc,
  updateDocStatus,
} from "../../../helpers/redux/resources";
import { getAllResourceTypes } from "../../../helpers/redux/resourseTypes";
import { getAllFaculties } from "../../../helpers/redux/faculties";
import { getAllDepartments } from "../../../helpers/redux/departments";
import { getAllCategories } from "../../../helpers/redux/categories";
import { getAllExams } from "../../../helpers/redux/exams";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PDFViewer from "../../Modal/PDFViewer";
import * as pdfjsLib from "pdfjs-dist/webpack";

const UploadBtnStyles = {
  fontWeight: "bold",
  color: "white",
  background: "#398b18",
  width: "80%",
  borderRadius: 5,
  padding: 10,
  marginTop: 20,
  marginBottom: 20,
};

const UploadForm = () => {
  const { role, userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [approvedLoading, setApprovedLoading] = useState(false);
  const [rejectedLoading, setRejectedLoading] = useState(false);
  const [singleDoc, setSingleDoc] = useState(null);
  const allDocs = useSelector((state) => state.resource.resources);

  const categoriesStates = useSelector((state) => state.categories.categories);
  const examStates = useSelector((state) => state.exams.exams);
  const resourceTypeState = useSelector(
    (state) => state.resourceType.resourceTypes
  );
  const allStateFaculties = useSelector((state) => state.faculties.faculties);
  const allStateDepartments = useSelector(
    (state) => state.departments.departments
  );

  const [examType, setExamType] = useState([]);
  const [categories, setCategories] = useState([]);
  const [exams, setExams] = useState([]);
  const [rsType, setRsType] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [screenshotsOne, setSecreenshotOne] = useState(null);
  const [screenshotsTwo, setSecreenshotTwo] = useState(null);
  const [screenshotsThree, setSecreenshotThree] = useState(null);
  const [screenshotsFour, setSecreenshotFour] = useState(null);

  const [docPreview, setDocPreview] = useState(null);
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);
  const [preview3, setPreview3] = useState(null);
  const [preview4, setPreview4] = useState(null);

  const [resourceType, setResourceType] = useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");
  const [title, setTitle] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [exam, setExam] = useState("");
  const [vendor, setVendor] = useState("");
  const [numOfPages, setNumOfPages] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const getPdfPageCount = (pdfFilePath) => {
    return pdfjsLib
      .getDocument(pdfFilePath)
      .promise.then((pdf) => pdf.numPages)
      .catch((error) => {
        console.error("Error getting PDF page count:", error);
        return 0; // Return 0 in case of an error
      });
  };

  const { getRootProps: getFileDoc, getInputProps: getFileInput } = useDropzone(
    {
      onDrop: (acceptedFiles) => {
        setUploadedDoc(acceptedFiles[0]);

        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setDocPreview(objectUrl);

        getPdfPageCount(objectUrl).then((pageCount) => {
          console.log("Number of pages:", pageCount);
          setNumOfPages(pageCount);
        });

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      },
      accept: {
        "application/pdf": [],
      },
    }
  );
  const { getRootProps: getShotOne, getInputProps: getInputOne } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSecreenshotOne(acceptedFiles[0]);

      const objectUrl = URL.createObjectURL(acceptedFiles[0]);
      setPreview1(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  const { getRootProps: getShotTwo, getInputProps: getInputTwo } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSecreenshotTwo(acceptedFiles[0]);

      const objectUrl = URL.createObjectURL(acceptedFiles[0]);
      setPreview2(objectUrl);
      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl);
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  const { getRootProps: getShotThree, getInputProps: getInputThree } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setSecreenshotThree(acceptedFiles[0]);

        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview3(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });
  const { getRootProps: getShotFour, getInputProps: getInputFour } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setSecreenshotFour(acceptedFiles[0]);

        const objectUrl = URL.createObjectURL(acceptedFiles[0]);
        setPreview4(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  const getRequiredData = async () => {
    await getAllCategories(dispatch, setLoading);
    await getAllResourceTypes(dispatch, setLoading);
    await getAllFaculties(dispatch, setLoading);
    await getAllDepartments(dispatch, setLoading);
    await getAllExams(dispatch, setLoading);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      uploadedDoc &&
      screenshotsOne &&
      screenshotsTwo &&
      screenshotsThree &&
      screenshotsFour &&
      title &&
      features &&
      description &&
      language &&
      price &&
      userId &&
      category
    ) {
      const data = new FormData();
      data.append("resourceDoc", uploadedDoc);
      data.append("screenshotOne", screenshotsOne);
      data.append("screenshotTwo", screenshotsTwo);
      data.append("screenshotThree", screenshotsThree);
      data.append("screenshotFour", screenshotsFour);
      data.append("school", resourceType);
      data.append("faculty", faculty);
      data.append("department", department);
      data.append("level", level);
      data.append("semester", semester);
      data.append("title", title);
      data.append("features", features);
      data.append("desc", description);
      data.append("language", language);
      data.append("price", price);
      data.append("vendorId", userId);
      data.append("category", category);
      data.append("exam", exam);
      data.append("numOfPages", numOfPages);

      const response = await uploadDoc(data, dispatch, setLoading);
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        navigate("/dashboard", { replace: true });
        toast.success(response.message.payload.message);
        return;
      }
    } else {
      toast.error("all fields are requied");
    }
  };

  const handleUpdateUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("resourceDoc", uploadedDoc);
    data.append("screenshotOne", screenshotsOne);
    data.append("screenshotTwo", screenshotsTwo);
    data.append("screenshotThree", screenshotsThree);
    data.append("screenshotFour", screenshotsFour);
    data.append("school", resourceType);
    data.append("faculty", faculty);
    data.append("department", department);
    data.append("level", level);
    data.append("semester", semester);
    data.append("title", title);
    data.append("features", features);
    data.append("desc", description);
    data.append("language", language);
    data.append("price", price);
    data.append("vendorId", userId);
    data.append("category", category);
    data.append("exam", exam);
    data.append("numOfPages", numOfPages);

    const response = await updateDoc(data, dispatch, setLoading);
    if (response.status === "error") {
      toast.error(response.res.payload);
      return;
    } else {
      toast.success(response.message.payload.message);
      return;
    }
  };

  const handleUpdateStatus = async (status) => {
    const data = {
      docId: id,
      status,
    };
    if (status === "approved") {
      const response = await updateDocStatus(
        data,
        dispatch,
        setApprovedLoading
      );
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        return;
      }
    } else {
      const response = await updateDocStatus(
        data,
        dispatch,
        setRejectedLoading
      );
      if (response.status === "error") {
        toast.error(response.res.payload);
        return;
      } else {
        toast.success(response.message.payload.message);
        return;
      }
    }
  };

  const setStatusChange = (value) => {
    handleUpdateStatus(value);
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  useEffect(() => {
    setCategories(categoriesStates);
  }, [categoriesStates]);

  useEffect(() => {
    setExams(examStates);
  }, [examStates]);

  useEffect(() => {
    setRsType(resourceTypeState);
  }, [resourceTypeState]);

  useEffect(() => {
    setFaculties(allStateFaculties);
  }, [allStateFaculties]);

  useEffect(() => {
    setDepartments(allStateDepartments);
  }, [allStateDepartments]);

  useEffect(() => {
    const getDocById = () => {
      if (allDocs.length > 0) {
        const doc = allDocs.filter((doc) => doc._id === id)[0];
        if (doc !== undefined) {
          setSingleDoc(doc);
          setVendor(doc?.vendor);
          setExamType(doc?.school ? "university" : "concour");
          setResourceType(doc?.school);
          setCategory(doc?.category);
          setExam(doc?.exam);
          setFaculty(doc?.faculty);
          setDepartment(doc?.department);
          setLevel(doc?.level);
          setSemester(doc?.semester);
          setTitle(doc?.title);
          setFeatures(doc?.features);
          setPrice(doc?.price);
          setLanguage(doc?.language);
          setDescription(doc?.desc);
          setDocPreview(doc?.doc?.doc);
          setPreview1(doc?.screenshots[0].doc);
          setPreview2(doc?.screenshots[1].doc);
          setPreview3(doc?.screenshots[2].doc);
          setPreview4(doc?.screenshots[3].doc);
          return;
        }
      }
    };

    if (id !== undefined && id !== null) {
      getDocById();
    }
  }, [id, allDocs]);

  return (
    <div
      style={{
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          maxHeight: "88vh",
        }}
      >
        <div
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 160,
          }}
        >
          <div
            style={{
              width: "80%",
            }}
          >
            <div>
              <div>
                <h4 style={{ fontWeight: "bold", fontSize: 20, marginTop: 80 }}>
                  {title}
                </h4>
                <div
                  {...getFileDoc()}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "1px dotted black",
                    borderRadius: 10,
                    cursor: "pointer",
                    height: "200px",
                    width: "100%",
                  }}
                >
                  <input {...getFileInput()} />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <GrDocumentText size={80} color="#398b18" />
                      {docPreview && (
                        <div
                          style={{
                            minWidth: "100%",
                            minHeight: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={docPreview}
                            alt={"PREVIEW"}
                            style={{
                              // minWidth: "100%",
                              // minHeight: "220px",
                              borderRadius: "10px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                    {!docPreview && (
                      <div className="text-center font-bold mt-2">
                        DRAG & DROP OR CLICK TO UPLOAD
                      </div>
                    )}
                  </div>
                </div>
                {docPreview && (
                  <div>
                    <PDFViewer docPreview={docPreview} />
                  </div>
                )}
                {role === "admin" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <img
                      src={
                        vendor?.avatar?.doc || "/assets/images/placeholder.jpeg"
                      }
                      alt="Profile"
                      style={{
                        cursor: "pointer",
                        borderRadius: "50%",
                        width: 50,
                        padding: 2,
                        background:
                          "linear-gradient(45deg, rgba(73,152,153,1) 0%, rgba(192,253,45,1) 100%)",
                      }}
                    />
                    <p
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        marginLeft: 10,
                      }}
                    >
                      {vendor?.username}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <h4
                  style={{
                    fontWeight: "bold",
                    margin: "30px 0px 10px 0px",
                    fontSize: 22,
                  }}
                >
                  Screenshots
                </h4>
                <div style={{ display: "flex" }}>
                  <div {...getShotOne()} className="screenshots">
                    <input {...getInputOne()} />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaPlus size={50} color="#398b18" />
                        {preview1 && (
                          <div style={{ minWidth: "100%", minHeight: "100%" }}>
                            <img
                              src={preview1}
                              alt={"preview"}
                              style={{
                                minWidth: "100%",
                                minHeight: "220px",
                                borderRadius: "10px",
                                border: "1px solid black",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div {...getShotTwo()} className="screenshots">
                    <input {...getInputTwo()} />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaPlus size={50} color="#398b18" />
                        {preview2 && (
                          <div style={{ minWidth: "100%", minHeight: "100%" }}>
                            <img
                              src={preview2}
                              alt={"preview"}
                              style={{
                                minWidth: "100%",
                                minHeight: "220px",
                                borderRadius: "10px",
                                border: "1px solid black",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div {...getShotThree()} className="screenshots">
                    <input {...getInputThree()} />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaPlus size={50} color="#398b18" />
                        {preview3 && (
                          <div style={{ minWidth: "100%", minHeight: "100%" }}>
                            <img
                              src={preview3}
                              alt={"preview"}
                              style={{
                                minWidth: "100%",
                                minHeight: "220px",
                                borderRadius: "10px",
                                border: "1px solid black",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div {...getShotFour()} className="screenshots">
                    <input {...getInputFour()} />
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FaPlus size={50} color="#398b18" />
                        {preview4 && (
                          <div style={{ minWidth: "100%", minHeight: "100%" }}>
                            <img
                              src={preview4}
                              alt={"preview"}
                              style={{
                                minWidth: "100%",
                                minHeight: "220px",
                                borderRadius: "10px",
                                border: "1px solid black",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "60%", padding: "0 30px 0 30px" }}>
          <h4 style={{ fontWeight: "bold", fontSize: 22, marginBottom: 20 }}>
            Please Fill the following Information
          </h4>
          <div>
            <label className={styles.labels}>Select Exam Type *</label>
            <select
              className="uploadFormInput"
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
            >
              <option>Select Exam Type</option>
              <option value="concour">Concour/High School Exam</option>
              <option value="university">University Exam</option>
            </select>
            <label className={styles.labels}>Select Course *</label>
            <select
              className="uploadFormInput"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Course</option>
              {categories.length > 0 ? (
                categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))
              ) : (
                <option>Loading Categories ...</option>
              )}
            </select>
            {examType === "concour" && (
              <div>
                <label className={styles.labels}>Select Exam *</label>
                <select
                  className="uploadFormInput"
                  value={exam}
                  onChange={(e) => setExam(e.target.value)}
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
              </div>
            )}
            {examType === "university" && (
              <>
                <label className={styles.labels}>Select School *</label>
                <select
                  className="uploadFormInput"
                  value={resourceType}
                  onChange={(e) => setResourceType(e.target.value)}
                >
                  <option>Select School</option>
                  {rsType.length > 0 ? (
                    rsType.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))
                  ) : (
                    <option>Loading Schools ...</option>
                  )}
                </select>

                <label className={styles.labels}>Select Faculty *</label>
                <select
                  className="uploadFormInput"
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                >
                  <option>Faculty</option>
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

                <label className={styles.labels}>Select Department *</label>
                <select
                  className="uploadFormInput"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
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

                <label className={styles.labels}>Select Level *</label>
                <select
                  className="uploadFormInput"
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

                <label className={styles.labels}>Select Semester *</label>
                <select
                  className="uploadFormInput"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option>Semester</option>
                  <option value={"first"}>First Semester</option>
                  <option value={"second"}>Second Semester</option>
                </select>
              </>
            )}

            <label className={styles.labels}>Select Language *</label>
            <select
              className="uploadFormInput"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>Language</option>
              <option value={"english"}>English</option>
              <option value={"french"}>French</option>
            </select>
          </div>
          <h4
            style={{
              fontWeight: "bold",
              fontSize: 22,
              margin: "40px 0 20px 0",
            }}
          >
            Paper Details
          </h4>
          <div>
            <label className={styles.labels}>Enter Price *</label>
            <div>
              <input
                type="number"
                placeholder="Enter Price"
                className="uploadFormInput"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <label className={styles.labels}>Enter Title *</label>
            <div>
              <input
                type="text"
                placeholder="Enter Title"
                className="uploadFormInput"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <label className={styles.labels}>Add Features *</label>
            <div>
              <textarea
                className="uploadFormInput"
                placeholder="Add Features"
                rows="4"
                cols="50"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              ></textarea>
            </div>
            <label className={styles.labels}>Enter Brief Description *</label>
            <div>
              <input
                type="text"
                placeholder="Short Description"
                className="uploadFormInput"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          {role === "admin" && (
            <div>
              <button
                style={{
                  fontWeight: "bold",
                  color: "white",
                  background: "#398b18",
                  padding: "10px 35px",
                  borderRadius: 5,
                }}
                onClick={() => {
                  setStatusChange("approved");
                }}
              >
                {approvedLoading ? "LOADING..." : " APPROVE"}
              </button>
              <button
                style={{
                  fontWeight: "bold",
                  color: "white",
                  background: "red",
                  padding: "10px 35px",
                  borderRadius: 5,
                  marginLeft: 20,
                }}
                onClick={() => {
                  setStatusChange("rejected");
                }}
              >
                {rejectedLoading ? "LOADING..." : "REJECT"}
              </button>
            </div>
          )}
          {role !== "admin" &&
            (singleDoc ? (
              <button style={UploadBtnStyles} onClick={handleUpdateUpload}>
                {loading ? "LOADING..." : " UPDATE"}
              </button>
            ) : (
              <button style={UploadBtnStyles} onClick={handleUpload}>
                {loading ? "LOADING..." : " UPLOAD"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
