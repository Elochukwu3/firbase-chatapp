import React, { useState } from "react";
import gallery from "../images/gallery.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [err, setErr] = useState(false);
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target.username.value;
    const userEmail = e.target.email.value;
    const userPassword = e.target.password.value;
    const userAvatar = e.target.file.files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );

      const storageRef = ref(storage, userName);

      const uploadTask = uploadBytesResumable(storageRef, userAvatar);

      uploadTask.on(
        (error) => {
          setErr(true);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName: userName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: userName,
              email: userEmail,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "chatCollections", response.user.uid), {});
            navigate('/')
          });
        }
      );

      e.target.reset();
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <div className="chatLogo">JB_Chat</div>
        <div className="chatRegister">Register</div>
        <form className="form" onSubmit={handleSubmit}>
          <input type={"text"} placeholder={"username"} name={"username"} />
          <input type={"email"} placeholder={"email"} name={"email"} />
          <input type={"password"} placeholder={"password"} name={"password"} />
          <input type={"file"} id="file" className="fileInput" name={"file"} />
          <label htmlFor="file">
            <img src={gallery} alt="" />
            <span>Add an Avatar</span>
          </label>
          <button type="submit">Sign up</button>
          {err && <span>something went wrong</span>}
        </form>
        <p className="logon">You do have an account? <Link to={'/login'}>Login</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
