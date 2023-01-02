import React from "react";
import Chats from "./Chats";
import NavBar from "./NavBar";
import Search from "./Search";
import plus from "../images/plus.png";
const SideBar = ({collapseRef, ownRef}) => {

  return (
    <div className="sidebar">
      <NavBar />
      <Search />
      <Chats collapseRef={collapseRef} ownRef={ownRef}/>
      <div className="mobile-icon">
        <img src={plus} alt="ddd" />
      </div>
    </div>
  );
};

export default SideBar;
