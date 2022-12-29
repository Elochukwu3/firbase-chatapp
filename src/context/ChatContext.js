import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

const INITIAL ={
    chatId: null,
        user: {}
}

export const ChatProvider = ({ children }) => {
    const {currentUser} = useContext(AuthContext);
    const reducer = (state, action) =>{
        switch (action.type) {
            case "CHANGE":
             return{
                user: action.payload,
                chatId:currentUser.uid > action.payload.id
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
             }
        
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, INITIAL);
  

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
