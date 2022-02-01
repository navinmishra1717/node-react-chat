import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { connect } from "react-redux";
// import ReduxToastr from "react-redux-toastr";
import { setCurrentUser } from "../services/auth";
import store from "../store";

import HomePage from "../containers/Homepage";
import LoginPage from "../containers/LoginPage";
import UserChatPage from "../containers/Messages/UserChatPage";
import PrivateRoute from "./privateRoute";

const cookieToken = Cookies.get("ninaya-token");
if (localStorage["ninaya-token"] && cookieToken) {
  const parsedToken = JSON.parse(localStorage["ninaya-token"]);
  const { token } = parsedToken;
  const { timestamp } = parsedToken;
  const today = new Date();

  const previousDate = new Date(timestamp);
  previousDate.setDate(previousDate.getDate() + 7);

  const fullDateToday = today.getTime();
  const fullPreviousDate = previousDate.getTime();

  if (fullDateToday <= fullPreviousDate) {
    const decoded = jwtDecode(token);
    store.dispatch(setCurrentUser(decoded));
  } else {
    localStorage.removeItem("token");
    Cookies.remove("token");
  }
}

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/chat/:user" element={<UserChatPage />} />
          </Route>
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Routers);
