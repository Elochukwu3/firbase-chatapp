import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import EachMessage from "./EachMessage";

const MessagesComp = () => {
  const [eachMsg, setEachMsg] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => { 
    const getMesages= () => {
      const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setEachMsg(doc.data().messages)
      });
      return () => {
        unsub();
      };
    };
    data.chatId && getMesages();
  }, [data.chatId]);

  return (
    <div className="messages">
      {
        eachMsg.map(msg=>(
          <EachMessage message = {msg} key={msg.id}/>
        ))
      }
    </div>
  );
};

export default MessagesComp;
