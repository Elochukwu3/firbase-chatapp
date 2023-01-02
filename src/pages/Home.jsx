import React, { useRef, useEffect, useState, useContext } from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import { ChatContext } from "../context/ChatContext";
const Home = () => {
  const [set, setSet] = useState(null);
  const [setSide, setSetSide] = useState(null);
  const homeRef = useRef(null);
  const { data, setDisplay } = useContext(ChatContext);

  useEffect(() => {
    const parentClass = homeRef.current;
    const parent = parentClass.parentElement;
    const chatBar = parent.querySelector(".chatbar");
    const sideBar = parent.querySelector(".sidebar");
    setSet(chatBar);
    setSetSide(sideBar);
  }, [data.chatId]);

  return (
    <div className="home">
      <div className="homeContainer" ref={homeRef}>
        <SideBar collapseRef={set !== null && set} ownRef = {setSide}/>
        <Chat myRef={set !== null && set} ownRef= {setSide}/>
      </div>
    </div>
  );
};

export default Home;
