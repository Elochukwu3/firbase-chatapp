import React from 'react'
import plus from '../images/plus.png';
import chat from '../images/chat.png';
import key from '../images/key.png';

const Chat = () => {
  return (
    <div className='chatbar'>
      <div className="chatInfo">
        <span>Romauld</span>
        <div className="icons">
          <img src={chat} alt="" />
          <img src={key} alt=""  className='invert-img'/>
          <img src={plus} alt="" className='invert-img'/>
        </div>
      </div>
    </div>
  )
}

export default Chat