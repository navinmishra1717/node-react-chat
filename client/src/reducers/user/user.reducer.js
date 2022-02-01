import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  error: null,
  isFetchingUser: false,
  isFetchingUsersList: false,
  users: [],
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isFetchingUser: true,
      };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetchingUser: false,
      };
    case UserActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        isFetchingUser: false,
        error: action.payload,
      };

    case UserActionTypes.UPDATE_USERS_LIST:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return { ...state };
  }
};

export default UserReducer;
