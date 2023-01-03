import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


const EachMessage = ({ message }) => {
  const myRef = useRef();
  useEffect(() => {
    myRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  let total_miliseconds =
    (message.date.seconds + message.date.nanoseconds * 0.00000001) * 1000;
  let timeSent = new Date(total_miliseconds);
  let messageHour = timeSent.getHours().toString();
  let messageMin = timeSent.getMinutes().toString();
const replace = (num)=>{
  let numLength = num.length,  minLength = 2;

  if (numLength >= minLength)return num
  return "0".repeat(minLength - numLength) + num; 
}
const displayHour = replace(messageHour)
const displayMin = replace(messageMin)


  if (message.text !== "")
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
        </div>
        <div className="messageContent">
          {message.text !== "image" && (
            <p>
              {message.text} <span> {`${displayHour}:${displayMin}`}</span>
            </p>
          )}
          {message.img && (
            <div className="msgImge">
              <img src={message.img} alt="" /> <br />
              <small> {`${displayHour}:${displayMin}`}</small>
            </div>
          )}
        </div>
      </div>
    );
};

export default EachMessage;
