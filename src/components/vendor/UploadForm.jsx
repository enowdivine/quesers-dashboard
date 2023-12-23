import React, { useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { RouteContext } from "../../context/NavigationContext";

const UploadForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps: getFileDoc, getInputProps: getFileInput } = useDropzone(
    {
      onDrop: (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
      },
    }
  );
  const { getRootProps: getShotOne, getInputProps: getInputOne } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });
  const { getRootProps: getShotTwo, getInputProps: getInputTwo } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });
  const { getRootProps: getShotThree, getInputProps: getInputThree } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
      },
    });
  const { getRootProps: getShotFour, getInputProps: getInputFour } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
      },
    });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
                      {uploadedFiles.map((file) => (
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
                      {uploadedFiles.map((file) => (
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
                      {uploadedFiles.map((file) => (
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
                      {uploadedFiles.map((file) => (
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
          <select className="uploadFormInput">
            <option>Exam/School</option>
          </select>
          <select className="uploadFormInput">
            <option>Faculty</option>
          </select>
          <select className="uploadFormInput">
            <option>Department</option>
          </select>
          <select className="uploadFormInput">
            <option>Level</option>
          </select>
          <select className="uploadFormInput">
            <option>Semester</option>
          </select>
        </div>
        <h4
          style={{ fontWeight: "bold", fontSize: 22, margin: "40px 0 20px 0" }}
        >
          Paper Details
        </h4>
        <div>
          <input
            type="text"
            placeholder="Enter Title"
            className="uploadFormInput"
          />
          <textarea
            className="uploadFormInput"
            placeholder="Add Features"
            rows="4"
            cols="50"
          ></textarea>
          <input
            type="text"
            placeholder="Short Description"
            className="uploadFormInput"
          />
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
