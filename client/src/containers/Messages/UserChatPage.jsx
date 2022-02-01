import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@material-ui/core";
import MessageInput from "./MessageInput";
import { auth } from "../../helpers";

let newSocket;
const UserChatPage = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  console.log(authorized, "authorized");

  const token = localStorage.getItem("chat-token");
  const currentUser = useSelector(auth.getCurrentUser);
  const { user } = useParams();
  useEffect(() => {
    if (!socketConnected) {
      console.log(window.location, "origin");
      newSocket = io.connect(`ws://${window.location.hostname}:8083`, {
        path: "/ws/",
        transports: ["websocket"],
      });

      newSocket.on("connect", () => {
        setSocketConnected(true);
        newSocket.emit("connected", { token });
      });
    }
    return () => {
      setSocketConnected(false);
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socketConnected) {
      newSocket.on("auth", (payload) => {
        if (payload.success) {
          setAuthorized(true);
        }
      });
    }
  }, [socketConnected]);

  return (
    <>
      {socketConnected ? (
        <Card variant="outlined">
          <CardContent>
            <div className="chat-container">
              {authorized ? (
                <>
                  <MessageInput
                    socket={newSocket}
                    from={currentUser.username}
                    to={user}
                  />
                </>
              ) : (
                <>Loading...</>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>Not Connected</div>
      )}
    </>
  );
};

export default UserChatPage;
