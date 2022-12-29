import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      e.target.reset();
      navigate("/");

    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="chatLogo">JB_Chat</div>
        <div className="chatRegister">Login</div>
        <form className="form" onSubmit={handleSubmit}>
          <input type={"email"} placeholder={"email"} name="email" />
          <input type={"password"} placeholder={"password"} name="password" />

          <button type="submit">Sign in</button>
        </form>
        <p className="logon">You don't have an account? <Link to={'/sigup'}>Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
