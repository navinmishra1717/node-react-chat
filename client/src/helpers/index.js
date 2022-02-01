import * as authHelper from "./authHelper";
export const auth = authHelper;
export const user = authHelper;
export const API_URL = process.env.REACT_APP_API_URL;
export const call = (handler, ...data) => {
  if (handler) {
    handler(...data);
  }
};
