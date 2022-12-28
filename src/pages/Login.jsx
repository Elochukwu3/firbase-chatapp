import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
        <div className='chatLogo'>JB_Chat</div>
        <div className='chatRegister'>Login</div>
        <form className='form'>
            <input type={"email"} placeholder={"email"}/>
            <input type={"password"} placeholder={"password"}/>
           
            <button>Sign in</button>
        </form>
        <p className='logon'>You don't have an account? Register</p>
        </div>
    </div>
  )
}

export default Login