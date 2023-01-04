import React, { useState } from "react";
import gallery from "../images/gallery.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const SignUp = () => {
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const userName = e.target.username.value.trim().toLowerCase();
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    const userAvatar = e.target.file.files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const storageRef = await ref(storage, userName);

      const uploadTask = uploadBytesResumable(storageRef, userAvatar);

      uploadTask.on(
        (error) => {
          setErr(true);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName: userName,
              photoURL: downloadURL ? downloadURL :"",
            });

            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: userName,
              email: userEmail,
              photoURL:  downloadURL ? downloadURL :"",
            });
            await setDoc(doc(db, "chatCollections", response.user.uid), {});
            setTimeout(() => {
              setLoader(false);
            }, 3500);
            navigate("/");
          });
        }
      );

      e.target.reset();
    } catch (error) {
      setErr(true);
      setLoader(false);
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
            <div className="chatRegister">Register</div>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type={"text"}
                placeholder={"username"}
                name={"username"}
                required
              />
              <input
                type={"email"}
                placeholder={"email"}
                name={"email"}
                required
              />
              <input
                type={"password"}
                placeholder={"password"}
                name={"password"}
                required
              />
              <input
                type={"file"}
                id="file"
                className="fileInput"
                name={"file"}
                required
              />
              <label htmlFor="file">
                <img src={gallery} alt="" />
                <span>Add an Avatar {"(maxmum size 1.5MB)"}</span>
              </label>
              <button type="submit">Sign up</button>
              {err && (
                <span className="error">something went wrong, try again</span>
              )}
            </form>
            <p className="logon">
              You do have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
