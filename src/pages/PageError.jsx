import React from "react";
import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1 style={{ fontWeight: "bold", fontSize: "200px" }}>Oops!</h1>
        <h3 style={{ fontWeight: "bold", fontSize: "30px" }}>
          404 - PAGE NOT FOUND
        </h3>
        <p style={{ margin: 20 }}>
          The page you are looking for might have been removed, had its name
          changed or its temporarily unavailable.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link
            to={"/dashboard"}
            style={{
              background: "#398b18",
              padding: "15px 20px",
              borderRadius: 5,
              color: "white",
              fontWeight: "bold",
            }}
          >
            GO TO DASHBOARD
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageError;
