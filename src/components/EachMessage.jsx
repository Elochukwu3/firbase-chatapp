import React from 'react';
import elo from '../images/elo.jpg';

const EachMessage = () => {
  return (
    <div className='eachMessage owne r'>
        <div className="messageInfo">
            <img src={elo} alt="" />
            <span>just now</span>
        </div>
        <div className="messageContent">
            <p>Hello guys</p>
            <img src={elo} alt="" />
        </div>
    </div>
  )
}

export default EachMessage