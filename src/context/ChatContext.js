import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [resize, setResize] = useState('block');
  const [display, setDisplay] = useState(false);
  


  const { currentUser } = useContext(AuthContext);
  const INITIAL = {
    chatId: null,
    user: {},
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, INITIAL);

  return (
    <ChatContext.Provider value={{ data: state, dispatch, resize, display, setDisplay, setResize, }}>
      {children}
    </ChatContext.Provider>
  );
};
