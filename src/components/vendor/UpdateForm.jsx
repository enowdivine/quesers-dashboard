import React, { useState, useContext } from "react";
import { GrDocumentText } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { uploadDoc } from "../../helpers/redux/resources";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [screenshotsOne, setSecreenshotOne] = useState([]);
  const [screenshotsTwo, setSecreenshotTwo] = useState([]);
  const [screenshotsThree, setSecreenshotThree] = useState([]);
  const [screenshotsFour, setSecreenshotFour] = useState([]);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getRootProps: getFileDoc, getInputProps: getFileInput } = useDropzone(
    {
      onDrop: (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
      },
    }
  );
  const { getRootProps: getShotOne, getInputProps: getInputOne } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSecreenshotOne(acceptedFiles);
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  const { getRootProps: getShotTwo, getInputProps: getInputTwo } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSecreenshotTwo(acceptedFiles);
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });
  const { getRootProps: getShotThree, getInputProps: getInputThree } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setSecreenshotThree(acceptedFiles);
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });
  const { getRootProps: getShotFour, getInputProps: getInputFour } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setSecreenshotFour(acceptedFiles);
      },
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
    });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      uploadedFiles[0] &&
      screenshotsOne[0] &&
      screenshotsTwo[0] &&
      screenshotsThree[0] &&
      screenshotsFour[0] &&
      resourceType &&
      faculty &&
      department &&
      level &&
      semester &&
      title &&
      features &&
      description &&
      language &&
      price &&
      userId
    ) {
      const data = new FormData();
      data.append("resourceDoc", uploadedFiles[0]);
      data.append("screenshotOne", screenshotsOne[0]);
      data.append("screenshotTwo", screenshotsTwo[0]);
      data.append("screenshotThree", screenshotsThree[0]);
      data.append("screenshotFour", screenshotsFour[0]);
      data.append("resourceType", resourceType);
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
                    </div>
                    <div className="text-center font-bold mt-2">
                      DRAG & DROP OR CLICK TO UPLOAD
                    </div>
                    <ul>
                      {uploadedFiles.map((file) => (
                        <li key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
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
                      </div>
                      <ul>
                        {screenshotsOne.map((file) => (
                          <li key={file.name}>{file.name}</li>
                        ))}
                      </ul>
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
                      </div>
                      <ul>
                        {screenshotsTwo.map((file) => (
                          <li key={file.name}>{file.name}</li>
                        ))}
                      </ul>
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
                      </div>
                      <ul>
                        {screenshotsThree.map((file) => (
                          <li key={file.name}>{file.name}</li>
                        ))}
                      </ul>
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
                      </div>
                      <ul>
                        {screenshotsFour.map((file) => (
                          <li key={file.name}>{file.name}</li>
                        ))}
                      </ul>
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
            <select
              className="uploadFormInput"
              onChange={(e) => setResourceType(e.target.value)}
            >
              <option>Exam/School</option>
              <option value={"University of Buea"}>University of Buea</option>
              <option value={"Ordinary Level"}>Ordinary Level</option>
              <option value={"Advanced Level"}>Advanced Level</option>
            </select>
            <select
              className="uploadFormInput"
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option>Faculty</option>
              <option value={"Arts"}>Arts</option>
              <option value={"Science"}>Science</option>
            </select>
            <select
              className="uploadFormInput"
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option>Department</option>
              <option value={"Computer"}>Ccomputer</option>
              <option value={"Electrical"}>Electrical</option>
            </select>
            <select
              className="uploadFormInput"
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Level</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={500}>500</option>
            </select>
            <select
              className="uploadFormInput"
              onChange={(e) => setSemester(e.target.value)}
            >
              <option>Semester</option>
              <option value={"First Semester"}>First Semester</option>
              <option value={"Second Semester"}>Second Semester</option>
            </select>
            <select
              className="uploadFormInput"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>Language</option>
              <option value={"English"}>English</option>
              <option value={"French"}>French</option>
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
            <input
              type="number"
              placeholder="Enter Price"
              className="uploadFormInput"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Title"
              className="uploadFormInput"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="uploadFormInput"
              placeholder="Add Features"
              rows="4"
              cols="50"
              onChange={(e) => setFeatures(e.target.value)}
            ></textarea>
            <input
              type="text"
              placeholder="Short Description"
              className="uploadFormInput"
              onChange={(e) => setDescription(e.target.value)}
            />
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
              >
                APPROVE
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
              >
                REJECT
              </button>
            </div>
          )}
          <button style={UploadBtnStyles} onClick={handleUpload}>
            {loading ? "LOADING..." : " UPLOAD"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
