import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_ERRORS,
} from "../helpers/constant/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_ERRORS:
      return {
        ...state,
        isAuthenticated: false,
        errors: action.payload,
      };

    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
export default reducer;
