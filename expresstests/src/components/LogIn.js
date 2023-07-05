import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import "../styling/VideoSelect.css";
function LogIn() {
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
    loginPasswordIncorrect, setLoginPasswordIncorrect,
    usernameNotFound, setUsernameNotFound,
    usernameAlreadyExists, setUsernameAlreadyExists
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log("Render Log In");
    setLogInUsernameExists(false);
    setLogInPasswordMatches(false);
    axios.get(`http://localhost:3000/api/users`, {}).then((value) => {
      setLogInUsers(value.data);
    });
  }, []);
  const bcrypt = require("bcryptjs");
  const cookies = new Cookies();
  const LogInClick = () => {
    if (logInUsernameExists && logInPasswordMatches) {
      setCurrentUserId(logInUsernameExists.uid);
      setPage("Videos");
      cookies.set(
        "WatchTimeAuthCookie",
        {
          uid: logInUsernameExists.uid,
        },
        { path: "watchtime", maxAge: 9999999 }
      );
      console.log("Logged in successfully");
    }
    /*if(logInUsernameExists!=undefined && logInPasswordMatches)
        {
            setCurrentUserId(logInUsernameExists.uid);
            setPage("Videos");
            cookies.set('WatchTimeAuthCookie', {
                uid: logInUsernameExists.uid
              }, { path: 'watchtime', maxAge: 9999999});
              console.log('Logged in successfully');
        }*/
  };
  const UsernameCheck = () => {
    axios.get(`http://localhost:3000/api/users`, {}).then((value) => {
      setLogInUsernameExists(
        value.data.find((value, index, array) => {
          return newLogInUsername === value.username;
        })
      );
    });
  };
  const PasswordCheck = () => {
    console.log(logInPasswordMatches);
    bcrypt
      .compare(
        newLogInPassword,
        logInUsers.find((value, index, obj) => {
          return value.username === newLogInUsername;
        }).passwordsalt
      )
      .then((value) => {
        setLogInPasswordMatches(value);
      });
  };
  return (
    <div>
      <h1>Log In</h1>
      <br></br>
      <div className="form-floating">
        <label>Username</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter your username..."
          onKeyUp={(event) => {
            UsernameCheck();
          }}
          onChange={(event) => {
            setNewLogInUsername(event.target.value);
          }}
        />
      </div>
      { !newLogInUsername &&
        <p id="ValidationText">Username cannot be blank.</p>
      }
      { newLogInUsername && !logInUsernameExists &&
        <p id="ValidationText">Username does not exist.</p>
      }
      <div className="form-floating">
        <label>Password</label>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Enter your password..."
          onKeyUp={(event) => {
            PasswordCheck();
          }}
          onChange={(event) => {
            setNewLogInPassword(event.target.value);
          }}
        />
      </div>
      { newLogInUsername && !logInPasswordMatches &&
        <p id="ValidationText">Password is incorrect.</p>
      }
      { !newLogInPassword &&
        <p id="ValidationText">Password cannot be blank.</p>
      }
      <br></br>
      <div className="form-floating">
        <input
          type="submit"
          className="form-control mb-2"
          placeholder="Enter a name for your video..."
          onClick={(event) => {
            LogInClick(event);
          }}
        />
      </div>
      <br></br>
    </div>
  );
}
export default LogIn;
