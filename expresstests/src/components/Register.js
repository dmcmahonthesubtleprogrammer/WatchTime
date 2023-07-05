import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import "../styling/VideoSelect.css";
function Register() {
  const {
    videos,
    setVideos,
    videoSrcs,
    setVideoSrcs,
    video,
    setVideo,
    selectedVideo,
    setSelectedVideo,
    page,
    setPage,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    newPasswordCheck,
    setNewPasswordCheck,
    newHashedPassword,
    setNewHashedPassword,
    newLogInUsername,
    setNewLogInUsername,
    newLogInPassword,
    setNewLogInPassword,
    currentUserId,
    setCurrentUserId,
    newUsernameCheck,
    setNewUsernameCheck,
    logInUsernameExists,
    setLogInUsernameExists,
    logInPasswordMatches,
    setLogInPasswordMatches,
    logInUsers,
    setLogInUsers,
    registerAvatarFile,
    setRegisterAvatarFile,
    registerConfirmPasswordMismatch, setRegisterConfirmPasswordMismatch,
          registerPasswordBlank, setRegisterPasswordBlank,
          registerPasswordTooShort, setRegisterPasswordTooShort,
          registerPasswordTooLong, setRegisterPasswordTooLong,
          registerConfirmPasswordBlank, setRegisterConfirmPasswordBlank,
          registerUsernameBlank, setRegisterUsernameBlank,
          registerUsernameTooShort, setRegisterUsernameTooShort,
          registerUsernameTooLong, setRegisterUsernameTooLong,
          registerPasswordNotComplex, setRegisterPasswordNotComplex,
          loginPasswordIncorrect, setLoginPasswordIncorrect,
          usernameNotFound, setUsernameNotFound,
          usernameAlreadyExists, setUsernameAlreadyExists
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log("Render Register");
  }, []);
  const bcrypt = require("bcryptjs");
  const cookies = new Cookies();
  const clickRegister = (event) => {
    const data = new FormData();
    const dateString = Date.now();
    let fileName = "";
    if(registerAvatarFile)
    {
      fileName = `${dateString}-${
        registerAvatarFile.name || registerAvatarFile
      }`.replace(/\s+/g, "");
      data.append("image", registerAvatarFile, fileName);
    }
    const uaid =
      "WT-" +
      Math.random().toString(16) +
      "000000000" +
      "-" +
      Math.random().toString(16) +
      "000000000";
    if (
      newUsername &&
      !newUsernameCheck &&
      newPassword &&
      newPasswordCheck &&
      newPassword === newPasswordCheck
    ) {
      setCurrentUserId(uaid);
      if (
        (registerAvatarFile && 
        registerAvatarFile.type === "image/jpeg" ||
        registerAvatarFile.type === "image/png" ||
        registerAvatarFile.type === "image/gif" ||
        registerAvatarFile.type === "image/jpg") || 
        !registerAvatarFile
      ) {
        axios.post(`http://localhost:3000/api/users`, {
          username: newUsername,
          passwordsalt: newHashedPassword,
          uid: uaid,
          avatarfilename: fileName || "user-avatar-icon.png",
        });
        if(registerAvatarFile)
        {
          axios.post(`http://localhost:5000/imageUpload`, data).then((res) => {});
        }
        cookies.set(
          "WatchTimeAuthCookie",
          {
            uid: uaid,
          },
          { path: "watchtime", maxAge: 9999999 }
        );
        console.log("Logged in successfully");
        setPage("Videos");
      } else {
        console.error("Image files only");
      }
    }
  };
  const usernameCheck = () => {
    if(newUsername && newUsername.length >= 1 && newUsername.length <= 255)
    {
    const users = axios
      .get(`http://localhost:3000/api/users`, {})
      .then((value) => {
        setNewUsernameCheck(
          value.data.find((value, index, array) => {
            return value.username === newUsername;
          })
        );
      });
    }
    if(!newUsername)
    {
      setRegisterUsernameBlank(true)
    }else{
      setRegisterUsernameBlank(false)
    }
    if(newUsername.length < 1)
    {
      setRegisterUsernameTooShort(true)
    }else{
      setRegisterUsernameTooShort(false)
    }
    if(newUsername.length > 255)
    {
      setRegisterPasswordTooLong(true)
    }else{
      setRegisterPasswordTooLong(false)
    }
  };
  const passwordCheck = () => {
    const numregex = /\d/g;
    const spregex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    if (newPassword === newPasswordCheck && newPassword.length >= 8 && newPasswordCheck.length >= 8 && newPassword.length <= 255 && newPasswordCheck.length <= 255) {
      if (numregex.test(newPassword) && spregex.test(newPassword) && newPassword.match(numregex).length >= 3 && newPassword.match(spregex).length >= 3) {
        bcrypt.hash(newPassword, 10).then((value) => {
          setNewHashedPassword(value);
        });
      }
    } else {
      setNewHashedPassword("");
    }
    if(newPassword !== newPasswordCheck)
    {
      setRegisterConfirmPasswordMismatch(true)
    }else{
      setRegisterConfirmPasswordMismatch(false)
    }
    if(newPassword.length < 8)
    {
      setRegisterPasswordTooShort(true)
    }else{
      setRegisterPasswordTooShort(false)
    }
    if(!newPasswordCheck)
    {
      setRegisterConfirmPasswordBlank(true)
    }else{
      setRegisterConfirmPasswordBlank(false)
    }
    if(newPassword.length > 255)
    {
      setRegisterPasswordTooLong(true)
    }else{
      setRegisterPasswordTooLong(false)
    }
    if(newPassword && (!numregex.test(newPassword) || !spregex.test(newPassword) || newPassword.match(numregex).length < 3 || newPassword.match(spregex).length < 3))
    {
      setRegisterPasswordNotComplex(true)
    }else{
      setRegisterPasswordNotComplex(false)
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <br></br>
      <div className="form-floating">
        <label>Username</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter a username for your new account..."
          onKeyUp={(event) => {usernameCheck()}}
          onChange={(event) => {
            setNewUsername(event.target.value);
          }}
        />
      </div>
      { registerUsernameBlank &&
      <p id="ValidationText">Username can't be blank.</p>
      }
      { registerUsernameTooShort &&
      <p id="ValidationText">Username's too short (8 characters or more).</p>
      }
      { registerUsernameTooLong &&
      <p id="ValidationText">Username's too long (255 characters or more).</p>
      }
      <div className="form-floating">
        <label>Password</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter a password for your new account..."
          onKeyUp={(event) => {passwordCheck()}}
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
      </div>
      { registerPasswordBlank &&
        <p id="ValidationText">Password can't be blank</p>
      }
      { registerConfirmPasswordMismatch &&
      <p id="ValidationText">Passwords don't match</p>
      }
      { registerPasswordTooShort &&
      <p id="ValidationText">Password's too short</p>
      }
      { registerPasswordTooLong &&
      <p id="ValidationText">Password's too long</p>
      }
      { registerPasswordNotComplex &&
      <p id="ValidationText">Password needs to have at least three numbers (ex. 123 etc.) and three special characters (ex. !?@ etc.)</p>
      }
      <div className="form-floating">
        <label>Confirm Password</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter your password again..."
          onKeyUp={passwordCheck()}
          onChange={(event) => {
            setNewPasswordCheck(event.target.value);
          }}
        />
      </div>
      { registerConfirmPasswordBlank &&
      <p id="ValidationText">Confirm password can't be blank</p>
      }
      <div className="form-floating">
        <label>Avatar</label>
        <input
          type="file"
          className="form-control mb-2"
          onChange={(event) => {
            setRegisterAvatarFile(event.target.files[0]);
          }}
        />
      </div>
      {
        registerAvatarFile &&
        registerAvatarFile.type !== "image/jpeg" &&
        registerAvatarFile.type !== "image/png" &&
        registerAvatarFile.type !== "image/gif" &&
        registerAvatarFile.type !== "image/jpg" &&
        <p id="ValidationText">Only image files (.png .jpg .jpeg .gif) are allowed.</p>
      }
      <br></br>
      <div className="form-floating">
        <input
          type="submit"
          className="form-control mb-2"
          placeholder="Enter a name for your video..."
          onClick={(event) => {
            clickRegister(event);
          }}
        />
      </div>
      <br></br>
    </div>
  );
}
export default Register;
