import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import gallery from "../images/gallery.png";
import plus from "../images/plus.png";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Inputs = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSubmit = async () => {
    if (image) {
      const storeImages = async (text) => {
        const storageRef = await ref(storage, uuid());
        const uploadTask =  uploadBytesResumable(storageRef, image);
        uploadTask.on(
          (error) => {
            console.log(error);
          },

          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      };
      if (image && text !== "") {
        storeImages(text);
      } else if (image && text === "") {
        storeImages("image");
      }
    } else {
      if (text !== "") {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }
    }

    await updateDoc(doc(db, "chatCollections", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: text === "" && image ? "&#x1F4F7;" : text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "chatCollections", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: text === "" && image ? "&#x1F4F7;" : text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="inputCont">
      <input
        type="text"
        placeholder="Type Something"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        {/* <img src={plus} alt="" /> */}
        <input
          type="file"
          id="file"
          className="fileInput"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={gallery} alt="" />
        </label>
        <button onClick={() => (image || text !== "" ? handleSubmit() : "")}>
          send
        </button>
      </div>
    </div>
  );
};

export default Inputs;
