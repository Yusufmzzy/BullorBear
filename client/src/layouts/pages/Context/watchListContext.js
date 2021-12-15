import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const WatchListContext = createContext(null);
export const WatchListContextProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const [userWatchList, setUserWatchList] = useState(null);
  useEffect(() => {
    fetch(`/api/getWatchlist/${currentUser?.username}`)
      .then((res) => res.json())
      .then((data) => setUserWatchList(data.data));
  }, [currentUser?.username,userWatchList]);

  return (
    <WatchListContext.Provider value={{ userWatchList }}>
      {children}
    </WatchListContext.Provider>
  );
};
