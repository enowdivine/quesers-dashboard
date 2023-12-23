import React, { createContext, useState, useEffect } from "react";

export const RouteContext = createContext();

export default ({ children }) => {
  const [selectedRoute, setSelectedRoute] = useState("Home");
  const [uploadModal, setUploadModal] = useState(false);
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    if (selectedRoute === "Create") {
      setUploadModal(true);
      return;
    }
    setUploadModal(false);
    return;
  }, [selectedRoute, uploadModal]);

  return (
    <RouteContext.Provider
      value={{
        selectedRoute,
        setSelectedRoute,
        uploadModal,
        setUploadModal,
        doc,
        setDoc,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};
