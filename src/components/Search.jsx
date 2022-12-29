import React, { useContext, useState } from "react";
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
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const comibinedId =
      currentUser.uid > user.id  
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", comibinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", comibinedId), { messages: [] });

        await updateDoc(doc(db, "chatCollections", currentUser.uid), {
          [comibinedId+".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [comibinedId+".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "chatCollections", user.uid), {
          [comibinedId+".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [comibinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    setUser(null)
    setUsername('')
  };

  return (
    <div className="search">
      <div className="searchInfo">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>user not found!</span>}
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
