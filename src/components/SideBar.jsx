import React, { useCallback, useContext, useEffect, useState } from "react";
import Chats from "./Chats";
import NavBar from "./NavBar";
import Search from "./Search";
import plus from "../images/plus.png";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const SideBar = ({ collapseRef, ownRef }) => {
  const [alreadyUser, setAlreadyUser] = useState([]);
  const { currentUser } = useContext(AuthContext);
 let arr=[];

  const dataBase = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      const names = (doc.id, " => ", doc.data());
      arr.push(names)
      return arr
    });
    setAlreadyUser(arr)
  }, []) 

 
  useEffect(() => {
  
    dataBase()

    return () => {
      dataBase()
    };
  }, [dataBase]);


  return (
    <div className="sidebar">
      <NavBar />
      <Search />
      <Chats collapseRef={collapseRef} ownRef={ownRef} />
      <div className="mobile-icon">
        {
         alreadyUser && alreadyUser.map((item, index)=>{
          return(
            <div key={index}>{item.displayName},</div>
          )
         })
        }
      </div>
    </div>
  );
};

export default SideBar;
