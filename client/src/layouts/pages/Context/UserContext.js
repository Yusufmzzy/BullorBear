import React, { createContext, useState } from "react";

export const UserContext = createContext(null);
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    sessionStorage.getItem("currentUser")
      ? JSON.parse(sessionStorage.getItem("currentUser"))
      : null
  );

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
