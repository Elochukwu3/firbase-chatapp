import React, { useContext, useRef } from "react";
import plus from "../images/plus.png";
import chat from "../images/chat.png";
import key from "../images/key.png";
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
        <span>{data.user?.displayName}</span>
        <div className="icons">
          <img src={chat} alt="" />
          <img src={key} alt="" className="invert-img" />
          <img src={plus} alt="" className="invert-img" onClick={handleDisplay}/>
        </div>
      </div>
      <MessagesComp />
      <Inputs />
    </div>
  );
};

export default Chat;
