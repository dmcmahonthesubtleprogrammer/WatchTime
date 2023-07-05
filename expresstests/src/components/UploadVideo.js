import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import "../styling/VideoSelect.css";

function UploadVideo() {
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
    videoName,
    setVideoName,
    videoDescription,
    setVideoDescription,
    newUsername,
    setNewUsername,
    newPassword,
    setNewPassword,
    newPasswordCheck,
    setNewPasswordCheck,
    newUsernameCheck,
    setNewUsernameCheck,
    newHashedPassword,
    setNewHashedPassword,
    newLogInUsername,
    setNewLogInUsername,
    newLogInPassword,
    setNewLogInPassword,
    currentUserId,
    setCurrentUserId,
    logInUsernameExists,
    setLogInUsernameExists,
    logInPasswordMatches,
    setLogInPasswordMatches,
    logInUsers,
    setLogInUsers,
    currentUser,
    setCurrentUser,
    comments,
    setComments,
    commentUsers,
    setCommentUsers,
  } = useContext(GlobalContext);
  const cookies = new Cookies();
  useEffect(() => {
    console.log("Render Upload Video");
    setVideo("");
    setComments("");
    setCommentUsers("");
    axios
      .get(
        `http://localhost:5000/api/currentuser${
          cookies.get("WatchTimeAuthCookie").uid
        }`
      )
      .then((res) => {
        console.log(res.data[0].username);
        setCurrentUser(res.data[0]);
      });
  }, []);
  const changeFile = (event) => {
    console.log(event.target.files[0].type);
    setVideo(event.target.files[0]);
    console.log(video);
  };
  const uploadFile = (event) => {
    const data = new FormData();
    const dateString = Date.now();
    const fileName = `${dateString}-${video.name}`.replace(/\s+/g, "");

    data.append("video", video, fileName);
    if (
      video.type === "video/mp4" ||
      video.type === "video/webm" ||
      video.type === "video/mov"
    ) {
      const now = new Date();
      const year = now.getFullYear();
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      const day = ("0" + now.getDate()).slice(-2);
      const hours = ("0" + now.getHours()).slice(-2);
      const minutes = ("0" + now.getMinutes()).slice(-2);
      const seconds = ("0" + now.getSeconds()).slice(-2);
      const currentDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      axios.post(`http://localhost:3000/api/videos`, {
        url: fileName,
        name: videoName,
        description: videoDescription || "",
        uid: currentUser.uid,
        dateposted: currentDateTimeString,
      });
      axios.post(`http://localhost:5000/upload`, data).then((res) => {});
      setPage("Videos");
    } else {
      console.error("Video files only");
    }
  };
  return (
    <div>
      <h1>Upload A Video</h1>
      <div className="form-floating">
        <label>Video</label>
        <input
          type="file"
          className="form-control mb-2"
          onChange={(event) => {
            changeFile(event);
          }}
        />
      </div>
      { !video &&
        <p id="ValidationText">Select or drag a video file to upload.</p>
      }
      { video && (video.type!=="video/mp4" && video.type!=="video/mov" && video.type!=="video/webm") &&
        <p id="ValidationText">Only video files (mov. mp4. webm.) are allowed.</p>
      }
      <div className="form-floating">
        <label>Name</label>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter a name for your video..."
          onChange={(event) => {
            setVideoName(event.target.value);
          }}
        />
      </div>
      { !videoName &&
        <p id="ValidationText">Name cannot be blank.</p>
      }
      <div className="form-floating">
        <label>Description</label>
        <textarea
          maxlength="5000"
          placeholder="Enter a description for your video..."
          className="form-control mb-2"
          onChange={(event) => {
            setVideoDescription(event.target.value);
          }}
        ></textarea>
      </div>
      <br></br>
      <div className="form-floating">
        <input
          type="submit"
          className="form-control mb-2"
          onClick={(event) => {
            uploadFile(event);
          }}
        />
      </div>
      <br></br>
    </div>
  );
}
export default UploadVideo;
