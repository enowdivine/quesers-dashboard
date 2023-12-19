import React, { createContext, useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { isExpired, decodeToken } from "react-jwt";

export const AuthContext = createContext();

export default ({ children }) => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const userToken = localStorage.getItem("quesers-admin");

  useEffect(() => {
    if (userToken) {
      const decodedToken = decodeToken(userToken);
      console.log(decodedToken);
      const isMyTokenExpired = isExpired(userToken);
      setAuthenticated(true);
      if (!isMyTokenExpired) {
        console.log(isMyTokenExpired);
      }
    }
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        token,
        setToken,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
