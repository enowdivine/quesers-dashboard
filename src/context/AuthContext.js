import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext();

export default ({ children }) => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const stateUser = useSelector((state) => state.auth.user);
  const userToken = localStorage.getItem("quesers-admin");
  useEffect(() => {
    if (userToken || stateUser) {
      const decodedToken = decodeToken(userToken || stateUser);
      setRole(decodedToken?.role);
      setToken(userToken);
      setAuthenticated(true);
      // const isMyTokenExpired = isExpired(userToken);
      // console.log("is expired", isMyTokenExpired);
      // if (!isMyTokenExpired) {
      //   setRole(decodedToken.role);
      //   setToken(userToken);
      //   setAuthenticated(true);
      // }
    }
  }, [userToken, stateUser]);

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
