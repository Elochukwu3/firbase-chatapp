import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase';

const NavBar = () => {

 const {currentUser} = useContext(AuthContext)
  return (
    <div className='navbar'>
        <span className="logo">JB_Base</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" className="userImg" />
            <span>{currentUser.displayName}</span>
            <button className="logout" onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default NavBar