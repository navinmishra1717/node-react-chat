import React from "react";
import { useSelector } from "react-redux";
import {
  // Route,
  Navigate,
  Outlet,
} from "react-router-dom";
// import { Container } from "@material-ui/core";
import { auth } from "../helpers";

const PrivateRoute = ({ element: Component, ...rest }) => {
  // const currentUser = useSelector(auth.getCurrentUser);

  const isAuthenticated = useSelector(auth.checkIfAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
