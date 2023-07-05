import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import AddComment from "./AddComment";
import ReplyComment from "./ReplyComment";
import "../styling/VideoSelect.css";

function ChangeAvatar(props) {
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
  } = useContext(GlobalContext);
  useEffect(() => {}, [currentUser]);
  const changeAvatar = () => {
    if(changeAvatarFile)
    {
    const data = new FormData();
    const dateString = Date.now();
    const fileName = `${dateString}-${
      changeAvatarFile.name || changeAvatarFile
    }`.replace(/\s+/g, "");
    data.append("image", changeAvatarFile, fileName);
    if (
      changeAvatarFile.type === "image/jpeg" ||
      changeAvatarFile.type === "image/png" ||
      changeAvatarFile.type === "image/gif" ||
      changeAvatarFile.type === "image/jpg"
    ) {
      axios.post(`http://localhost:5000/imageUpload`, data).then((res) => {});
      axios
        .delete(
          `http://localhost:5000/delete/file${currentUser.avatarfilename}`
        )
        .then((res) => {});
      axios
        .get(
          `http://localhost:5000/changeuseravatar${currentUser.uid}/${fileName}`
        )
        .then((res) => {});
      setPage("Profile");
    }
    }
  };
  return (
    <div>
      <h1>Change Avatar</h1>
      <div className="form-floating">
        <label>Avatar</label>
        <input
          type="file"
          className="form-control mb-2"
          onChange={(event) => {
            setChangeAvatarFile(event.target.files[0]);
          }}
        />
      </div>
      <br></br>
      <div className="form-floating">
        <input
          type="submit"
          className="form-control mb-2"
          placeholder="Enter a name for your video..."
          onClick={(event) => {
            changeAvatar(event);
          }}
        />
      </div>
      <br></br>
      <div className="form-floating">
        <button
          className="form-control mb-2"
          placeholder="Enter a name for your video..."
          onClick={(event) => {
            setPage("Profile");
          }}
        >Back</button>
      </div>
    </div>
  );
}
export default ChangeAvatar;