import React from 'react';
import gallery from '../images/gallery.png'

const SignUp = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
        <div className='chatLogo'>JB_Chat</div>
        <div className='chatRegister'>Register</div>
        <form className='form'>
            <input type={"text"} placeholder={"username"}/>
            <input type={"email"} placeholder={"email"}/>
            <input type={"password"} placeholder={"password"}/>
            <input type={"file"} id="file" className='fileInput'/>
            <label htmlFor='file'>
                <img src={gallery}/>
                <span>Add an Avatar</span>
            </label>
            <button>Sign up</button>
        </form>
        <p className='logon'>You do have an account? Login</p>
        </div>
    </div>
  )
}

export default SignUp