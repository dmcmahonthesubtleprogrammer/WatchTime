import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import AddComment from "./AddComment";
import ReplyComment from "./ReplyComment";
import "../styling/VideoSelect.css";
function Profile(props) {
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
    changeAvatarFile,
    setChangeAvatarFile,
    profileOldPassword,
    setProfileOldPassword,
    profileNewPassword,
    setProfileNewPassword,
    profileNewPasswordConfirm,
    setProfileNewPasswordConfirm,
    profileOldPasswordMatch,
    setProfileOldPasswordMatch,
    profileNewPasswordMatch,
    setProfileNewPasswordMatch,
    profilePasswordHash,
    setProfilePasswordHash,
  } = useContext(GlobalContext);
  useEffect(() => {
    setChangeAvatarFile("");
    setProfileOldPassword("");
    setProfileNewPassword("");
    setProfileNewPasswordConfirm("");
    setProfileOldPasswordMatch(false);
    setProfileNewPasswordMatch(false);
    setProfilePasswordHash("");
  });
  return (
    <div>
      <h1>Profile</h1>
      <h1>Current User: {props.user.username}</h1>
      <img
        src={`http://localhost:5000/images/${currentUser.avatarfilename}`}
        style={{
          width: "100px",
          height: "100px",
        }}
      ></img>
      <br></br>
      <button
        onClick={(event) => {
          setPage("ChangeAvatar");
        }}
      >
        Change Avatar
      </button>
      <br></br>
      <button
        onClick={(event) => {
          setPage("ChangePassword");
        }}
      >
        Change Password
      </button>
      <br></br>
      <button
        onClick={(event) => {
          setPage("ManageVideos");
        }}
      >
        Manage Videos
      </button>
      <br></br>
    </div>
  );
}
export default Profile;
