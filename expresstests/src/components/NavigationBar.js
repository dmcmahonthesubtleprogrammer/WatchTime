import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
function NavigationBar() {
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
    replyTarget,
    setReplyTarget,
    commentReply,
    setCommentReply,
    commentUsers,
    setCommentUsers,
    currentUser,
    setCurrentUser,
    commentText,
    setCommentText,
    comments,
    setComments,
  } = useContext(GlobalContext);
  useEffect(() => {
    setLogInUsernameExists(undefined);
    setLogInPasswordMatches(undefined);
    setNewHashedPassword(undefined);
    setReplyTarget(undefined);
    setCommentText("");
    setComments("");
    setCurrentUserId("");
    setCurrentUser("");
    axios.get(`http://localhost:3000/api/users`, {}).then((value) => {
      setLogInUsers(value.data);
    });
    if (cookies.get("WatchTimeAuthCookie")) {
      setCurrentUserId(cookies.get("WatchTimeAuthCookie").uid);
      try {
        axios
          .get(
            `http://localhost:5000/api/currentuser${
              cookies.get("WatchTimeAuthCookie").uid
            }`
          )
          .then((res) => {
            setCurrentUser(res.data[0]);
          });
      } catch (ex) {
        console.error("Not signed in");
      }
    }
  }, [page]);
  const bcrypt = require("bcryptjs");
  const cookies = new Cookies();
  const logOut = () => {
    setCurrentUserId("");
    setCurrentUser("");
    setPage("LogIn");
    cookies.remove("WatchTimeAuthCookie");
  };
  return (
    <nav style={{backgroundColor: 'cyan'}}>
      <h1 style={{
        fontSize: '50px'
      }}>WatchTime</h1>
      {currentUserId && (
        <>
          <p>
            Hello,{" "}
            {currentUser && (
              <a
                onClick={() => {
                  setPage("Profile");
                }}
              >
                {currentUser.username}
              </a>
            )}
            !{" "}
          </p>
        </>
      )}
      <button
        onClick={() => {
          setPage("Videos");
        }}
      >
        Videos
      </button>
      {currentUserId && (
        <button
          onClick={() => {
            setPage("Upload");
          }}
        >
          Upload a Video
        </button>
      )}
      {!currentUserId && (
        <>
          <button
            onClick={() => {
              setPage("LogIn");
            }}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setPage("Register");
            }}
          >
            Register
          </button>
        </>
      )}
      {currentUserId && (
        <button
          onClick={() => {
            logOut();
          }}
        >
          Log Out
        </button>
      )}
    </nav>
  );
}
export default NavigationBar;