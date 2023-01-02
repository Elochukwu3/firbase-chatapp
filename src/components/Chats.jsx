import { doc, onSnapshot } from "firebase/firestore";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = ({ collapseRef, ownRef }) => {
  const [chat, setChat] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const suscribe = onSnapshot(
        doc(db, "chatCollections", currentUser.uid),
        (doc) => {
          setChat(doc.data());
        }
      );

      return () => {
        suscribe();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE", payload: user });
    ownRef.classList.add("appear");
    collapseRef.classList.remove("appear")
  };

  return (
    <div className="chats">
      {Object.entries(chat)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chats) => (
          <div
            className="usersChat"
            key={chats[0]}
            onClick={() => handleSelect(chats[1].userInfo)}
          >
            <img src={chats[1].userInfo.photoURL} alt="" />
            <div className="chatInfo">
              <span>{chats[1].userInfo.displayName}</span>

              {chats[1].lastMessage?.text === "&#x1F4F7;" ? (
                <p>&#x1F4F7;</p>
              ) : (
                <p>{chats[1].lastMessage?.text}</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
