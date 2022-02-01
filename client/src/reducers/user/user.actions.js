import UserActionTypes from "./user.types";

export const fetchUsersListStart = () => ({
  type: UserActionTypes.FETCH_USERS_START,
});

export const fetchUserSuccess = () => ({
  type: UserActionTypes.FETCH_USERS_SUCCESS,
});

export const fetchUserFailure = (error) => ({
  type: UserActionTypes.FETCH_USERS_FAILURE,
  payload: error,
});

export const updateUsersList = (users) => ({
  type: UserActionTypes.UPDATE_USERS_LIST,
  payload: users,
});
