import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./user/user.reducer";

const reducers = {
  auth: authReducer,
  user: userReducer,
};
export default combineReducers(reducers);
