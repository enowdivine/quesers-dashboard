import React, { useState } from "react";
import UploadModal from "./UploadModal";
import { RouteContext } from "../../context/NavigationContext";

const UploadForm = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div>
        <div>{showModal && <UploadModal />}</div>
        <div>screenshots</div>
      </div>
      <div>form</div>
    </div>
  );
};

export default UploadForm;
