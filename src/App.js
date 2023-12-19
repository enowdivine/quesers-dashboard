import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";

function App() {
  const { role, authenticated } = useContext(AuthContext);
  return (
    <div>
      {authenticated && role === "admin" ? (
        <AdminLayout />
      ) : authenticated && role === "vendor" ? (
        <VendorLayout />
      ) : (
        <AuthLayout />
      )}
    </div>
  );
}

export default App;
