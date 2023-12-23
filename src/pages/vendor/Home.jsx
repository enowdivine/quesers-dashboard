import React, { useContext, useEffect } from "react";
import VendorLayout from "../../layouts/VendorLayout";
import MainContent from "../../components/vendor/MainContent";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/");
      return;
    }
  }, [authenticated]);

  return (
    <VendorLayout>
      <MainContent />
    </VendorLayout>
  );
};

export default Home;
