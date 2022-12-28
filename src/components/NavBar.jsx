import React from 'react'

const NavBar = () => {
  return (
    <div className='navbar'>
        <span className="logo">JB_Base</span>
        <div className="user">
            <img src="" alt="" className="userImg" />
            <span>Romauld</span>
            <button className="logout">Logout</button>
        </div>
    </div>
  )
}

export default NavBar