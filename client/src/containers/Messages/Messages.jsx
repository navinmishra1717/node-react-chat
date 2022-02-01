import React, { useEffect, useState } from "react";
import "./Messages.css";

function Messages({ socket, to }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (data) => {
      console.log(13131313131);
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[data.message.id] = data.message;
        return newMessages;
      });
    };

    const updateMessageListener = (data) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages.map((m) => {
          if (m.id === data.message.id) {
            m.sent = true;
          }
          return m;
        });
      });
    };

    const deleteMessageListener = (messageID) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        delete newMessages[messageID];
        return newMessages;
      });
    };

    socket.on("update", (data) => {
      console.log(66666666);
      console.log(data, "datatatatt");
      setMessages(messages);
    });
    socket.on("message", () => {
      console.log(4444444);
    });
    socket.on("deleteMessage", deleteMessageListener);
    socket.emit("getMessages", { to: to });
    socket.on("getMessages", (messages) => setMessages(messages));

    console.log(messages, "messages");

    return () => {
      socket.off("message", messageListener);
      socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket]);

  return (
    <div className="message-list">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message, i) => (
          <div
            key={i}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            {/* <span className="user">{message.user.name}:</span> */}
            <span className="message">{message.value}</span>
            <span className="date">
              {new Date(message.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
}

export default Messages;
