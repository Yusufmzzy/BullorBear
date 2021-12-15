import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserContextProvider } from "./layouts/pages/Context/UserContext";
import { WatchListContextProvider } from "./layouts/pages/Context/watchListContext";
ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <WatchListContextProvider>
        <App />
      </WatchListContextProvider>
    </UserContextProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
