import React, { useContext } from "react";
import chat from "../images/chat.png";
import MessagesComp from "./MessagesComp";
import Inputs from "./Inputs";
import { ChatContext } from "../context/ChatContext";

const Chat = ({myRef, ownRef}) => {
  const { data} = useContext(ChatContext);
 
  const handleDisplay = ()=>{
 myRef.classList.add("appear");
 ownRef.classList.remove("appear")
  }

  return (
    <div className="chatbar">
      <div className="chatInfo">
        <span onClick={handleDisplay}  className="invert-img">&#x2190;</span>
        <span className="destk-name">{data.user?.displayName}</span>
        <div className="icons">
          <span className="mobile-name">{data.user?.displayName}</span>
          <img src={chat} alt="" />

        </div>
      </div>
      <MessagesComp />
      <Inputs />
    </div>
  );
};

export default Chat;
