import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loader from "../components/Loader";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
      setTimeout(() => {
        setLoader(false);
      }, 3500);

      e.target.reset();
      navigate("/");
    } catch (error) {
      setErr(true);
      setTimeout(() => {
        setLoader(false);
      }, 2500);
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="formContainer">
          <div className="formWrapper">
            <div className="chatLogo">JB_Chat</div>
            <div className="chatRegister">Login</div>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type={"email"}
                placeholder={"email"}
                name="email"
                required
              />
              <input
                type={"password"}
                placeholder={"password"}
                name="password"
                required
              />
              <button type="submit">Sign in</button>

              {err && (
                <span className="error">something went wrong, try again</span>
              )}
            </form>
            <p className="logon">
              You don't have an account? <Link to={"/sigup"}>Register</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
