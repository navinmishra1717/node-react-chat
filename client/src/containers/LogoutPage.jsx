import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../services/auth";
// import crypto from "crypto-js";
import LogoutIcon from "@material-ui/icons/ExitToAppSharp";

import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const Logout = ({ location }) => {
  const dispatch = useDispatch();

  const handleLogout = (event) => {
    // event.preventDefault();
    dispatch(logout(() => {}));
  };

  return (
    <List>
      <ListItem button key={"Logout"} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={"Logout"} />
      </ListItem>
    </List>
  );
};

export default Logout;
