import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";

export const AuthContext = createContext();

export default ({ children }) => {
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const stateUser = useSelector((state) => state.auth.user);
  const userToken = localStorage.getItem("quesers-admin");
  useEffect(() => {
    if (userToken || stateUser) {
      const decodedToken = decodeToken(userToken || stateUser);
      setRole(decodedToken?.role);
      setUserId(decodedToken?.id);
      setToken(userToken);
      setAuthenticated(true);
    }
  }, [userToken, stateUser]);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
        userId,
        setUserId,
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
