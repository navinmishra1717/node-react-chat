import React, { useState, useEffect } from "react";
// import "./MessageInput.css";
import "./Messages.css";

const NewMessage = ({ socket, from, to }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("getMessages", { to: to });

    return () => {
      // socket.off("message", messageListener);
      // socket.off("deleteMessage", deleteMessageListener);
    };
  }, [socket, messages]);

  useEffect(() => {
    socket.on("getMessages", (data) => {
      setMessages(data.messages);
    });
    return () => {};
  }, [socket, messages]);

  const updateMessageListener = (data) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.map((m) => {
        if (m.id === data.message.id) {
          m.sent = true;
        }
        return m;
      });
      return newMessages;
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const data = {
      id: Date.now(),
      from: from,
      to: to,
      message: value,
      date: new Date(),
      sent: false,
    };
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages.push(data);
      return newMessages;
    });
    socket.emit("chat", data, updateMessageListener);
    socket.emit("getMessages", { to: to });
    console.log(454545544555);
    setValue("");
  };

  return (
    <>
      <div className="message-list">
        {[...Object.values(messages)]
          .sort((a, b) => a.time - b.time)
          .map((message, i) => (
            <div
              key={i}
              className="message-container"
              title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
            >
              <span className="user">{message.from}:</span>
              <span className="message">{message.message}</span>
              <span className="date">
                {new Date(message.date).toLocaleTimeString()}
              </span>
            </div>
          ))}
      </div>
      <form onSubmit={submitForm}>
        <input
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </form>
    </>
  );
};

export default NewMessage;
