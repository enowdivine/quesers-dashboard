import React, { useState, useContext } from "react";
import { FaLaptopFile } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import { RouteContext } from "../../context/NavigationContext";

const UploadModal = () => {
  const { uploadModal, setUploadModal, setDoc } = useContext(RouteContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });
  const setDocument = () => {
    setDoc(uploadedFiles[0]);
  };

  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-center">
              <div
                {...getRootProps()}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px dotted black",
                  height: "300px",
                }}
              >
                <input {...getInputProps()} />
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaLaptopFile size={150} color="#398b18" />
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
              {/* <button
                style={{
                  background: "#c4c41d",
                  color: "#fff",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  marginTop: "20px",
                  borderRadius: "5px",
                }}
              >
                Click To Upload
              </button> */}
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                onClick={() => setUploadModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setDocument()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
