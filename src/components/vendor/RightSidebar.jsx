import React from "react";
import Cards from "../Cards";
const RightSidebar = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/images/image2.jpg"
          alt="Profile Image"
          style={{ borderRadius: "50%", width: 200 }}
        />
      </div>
      <p style={{ textAlign: "center", fontWeight: "bold", marginTop: 10 }}>
        Martha Sagasta
      </p>
      <div style={{ marginTop: 20 }}>
        <h4 style={{ fontWeight: "bold" }}>Your Account</h4>
        <div style={{ marginTop: 10 }}>
          <Cards title={"Gains"} value={3671} desc={"CFA"} color={"#dcecf2"} />
        </div>
        <button
          style={{
            color: "#fff",
            background: "black",
            width: "100%",
            padding: 5,
            fontWeight: "bold",
            marginTop: 15,
            borderRadius: 5,
          }}
        >
          CASHOUT
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;
