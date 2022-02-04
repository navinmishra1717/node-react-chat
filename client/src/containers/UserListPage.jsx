import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchUsersListStart,
  fetchUserSuccess,
  fetchUserFailure,
  updateUsersList,
} from '../reducers/user/user.actions';

import {
  Card,
  CardContent,
  //   CardActions,
  //   List,
  //   Button,
  Typography,
  //   ListItem,
  //   ListItemIcon,
  //   ListItemText,
} from '@material-ui/core';
import { getUsers } from '../reducers/user/user.selector';
import { User } from '../services/users';

const UserList = ({ socket }) => {
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stableDispatch = useCallback(dispatch, []);
  const fetchUsers = useCallback(
    (params = {}) => {
      stableDispatch(fetchUsersListStart());
      User.fetchUsers(params)
        .then((response) => {
          if (response.success) {
            let users = response.data.map((user) => {
              return user;
            });

            stableDispatch(updateUsersList(users));
            stableDispatch(fetchUserSuccess());
          } else {
            throw new Error(JSON.stringify(response.error));
          }
        })
        .catch((error) => {
          console.trace(error.message);
          stableDispatch(fetchUserFailure(error.message));
        });
    },
    [stableDispatch]
  );
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChat = (user) => {
    // e.preventDefault();
    navigate(`/chat/${user}`);
  };

  return (
    <>
      <Card variant="outlined">
        {users &&
          users.map((u, i) => (
            <CardContent key={i}>
              <p key={i} onClick={() => handleChat(u.username)}>
                {u.username}
              </p>
              <Typography variant="h5" component="div"></Typography>
            </CardContent>
          ))}
      </Card>
    </>
  );
};

export default UserList;
