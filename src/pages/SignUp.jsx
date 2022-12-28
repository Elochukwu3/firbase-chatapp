import React from 'react'

const SignUp = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
        <div className='chatLogo'>JB_Chat</div>
        <div className='chatRegister'>Register</div>
        <form>
            <input type={"text"} placeholder={"username"}/>
            <input type={"email"} placeholder={"email"}/>
            <input type={"password"} placeholder={"password"}/>
            <input type={"file"}/>
            <button>Sign up</button>
        </form>
        <p>You do have an account? Login</p>
        </div>
    </div>
  )
}

export default SignUp