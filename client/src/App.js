import React from "react";
import Main from "./layouts/Main";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  CreateUser,
  Homepage,
  Login,
  PopularStocks,
  TrendingStocks,
  Stockdetail,
  Profile
} from "./layouts/pages";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Main>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/Stockdetail/:symbol">
            <Stockdetail />
          </Route>
          <Route path="/TrendingStocks">
            <TrendingStocks />
          </Route>
          <Route path="/PopularStocks">
            <PopularStocks />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Createuser">
            <CreateUser />
          </Route>
          <Route path="/Profile">
            <Profile />
          </Route>
          <Route path="">404: opss!</Route>
        </Switch>
      </Main>
    </BrowserRouter>
  );
}

export default App;
