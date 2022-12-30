import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import elo from "../images/elo.jpg";

const EachMessage = ({ message }) => {
  const myRef = useRef();
  useEffect(() => {
    myRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
console.log(message.senderId);
console.log(currentUser.uid);
  return (
    <div
      ref={myRef}
      className={`eachMessage ${
        message.senderId === currentUser.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default EachMessage;
