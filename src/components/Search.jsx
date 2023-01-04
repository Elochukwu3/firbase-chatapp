import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username.trim().toLowerCase())
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("user not found");
      }
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        setError(null);
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleKey = (e) => {
    setError(null);

    e.code === "Enter" &&
      currentUser.displayName !== username &&
      handleSearch();
  };

  const handleSelect = async () => {
    const comibinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", comibinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", comibinedId), { messages: [] });

        await updateDoc(doc(db, "chatCollections", currentUser.uid), {
          [comibinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [comibinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "chatCollections", user.uid), {
          [comibinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [comibinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null);
    setUsername("");
  };
  const searchInput = () => {
    if (currentUser.displayName !== username) {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <p className="caption">
        search for users from list below to start chatting{" "}
        <span className="red">&hearts; </span>
        <span className="yellow">&hearts; </span>
        <span className="green">&hearts;</span>
      </p>
      <div className="searchInfo">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button onClick={searchInput}>seacrh</button>
      </div>
      {error && <span className="notFound">user not found!</span>}
      {user && (
        <div className="usersChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="chatInfo">
            <span>{user.displayName}</span>
            <p>hello</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
