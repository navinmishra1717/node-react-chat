import React from "react";
import { Grid } from "@material-ui/core";

import LogoutPage from "../containers/LogoutPage";
import UserListPage from "../containers/UserListPage";
class HomePage extends React.Component {
  render() {
    return (
      <div className="mainDiv">
        <Grid container>
          <Grid item xs={8}>
            <h1>Welcome to test chat page. This is homepage</h1>
            <p>You can proceed to chat from here</p>
            <p>Users:</p>
            <UserListPage />
          </Grid>
          <Grid item xs={4}>
            <LogoutPage />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default HomePage;
