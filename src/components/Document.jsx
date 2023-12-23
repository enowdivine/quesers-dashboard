import React from "react";
import { GrDocumentText } from "react-icons/gr";

const Document = ({ title, color }) => {
  return (
    <div style={{ width: "20%" }}>
      <div
        style={{
          border: "1px solid black",
          borderRadius: 10,
          minHeight: 80,
          margin: "20px 10px 0px 10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <GrDocumentText size={40} color={color} />
      </div>
      <div style={{ fontSize: "15px", marginLeft: "10px" }}>{title}</div>
    </div>
  );
};

export default Document;
