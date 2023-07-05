import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import AddComment from "./AddComment";
import ReplyComment from "./ReplyComment";
import "../styling/VideoSelect.css";

function ManageVideos() {
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
    managedVideo,
    setManagedVideo,
    managedVideoTitle,
    setManagedVideoTitle,
    managedVideoDescription,
    setManagedVideoDescription,
    managedVideos,
    setManagedVideos,
    managedVideosPage,
    setManagedVideosPage,
    setVideoLoaded,
    managedVideoDeleteCheck,setManagedVideoDeleteCheck,
    managedVideoDeleteConsideration,setManagedVideoDeleteConsideration
  } = useContext(GlobalContext);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/uservideos${managedVideosPage}/${currentUserId}`
      )
      .then((res) => {
        //console.log(res);
        setManagedVideos(res.data);
      })
      .catch((reason) => {});
  }, [managedVideoTitle,managedVideoDescription,managedVideo]);
  const changeVideoDetails = () => {
    const videoObject = {
        title: managedVideoTitle || managedVideo.name,
        description: managedVideoDescription || managedVideo.description
    };
    setManagedVideoTitle("");
    setManagedVideoDescription("");
    axios
      .get(
        `http://localhost:5000/changevideodetails${managedVideo.id}/${videoObject.title}/${videoObject.description}`
      );
      setManagedVideo(undefined)
  };
  const deleteVideo = () => {
    setManagedVideoTitle("");
    setManagedVideoDescription("");
    axios
      .get(
        `http://localhost:5000/deletevideo${managedVideo.id}`
      );
      axios.delete(`http://localhost:5000/delete/videofile${managedVideo.url}`)
      .then(res => {
    });
    setManagedVideo(undefined)
    setManagedVideoDeleteConsideration(false)
  }
  return (
    <div>
      <h1>Manage Videos</h1>
      {managedVideo && (
        <>
            <br></br><p>Video Preview: </p><video src={`http://localhost:5000/videos/${managedVideo.url}`} controls
                width={1000}
                onLoadedData={(event) => {
                    setVideoLoaded(true)
                }}
                onError={(event) => {
                    setVideoLoaded(false)
                }
                }></video>
          <div className="form-floating">
            <label>Name</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder={managedVideo.name}
              value={managedVideoTitle}
              onChange={(event) => {
                setManagedVideoTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-floating">
            <label>Description</label>
            <textarea
              maxlength="5000"
              placeholder={managedVideo.description}
              className="form-control mb-2"
              value={managedVideoDescription}
              onChange={(event) => {
                setManagedVideoDescription(event.target.value);
              }}
            ></textarea>
          </div>
          <br></br>
          <div className="form-floating">
                <input
                    type="submit"
                    className="form-control mb-2"
                    placeholder="Enter a name for your video..."
                    onClick={(event) => {
                        changeVideoDetails();
                }}
                />
            </div>
            {!managedVideoDeleteConsideration &&
            <div className="form-floating">
                <input
                    type="submit"
                    className="form-control mb-2"
                    placeholder="Enter a name for your video..."
                    value={"Delete"}
                    style={{
                        backgroundColor: "red"
                    }}
                    onClick={(event) => {
                        setManagedVideoDeleteConsideration(true)
                }}
                />
            </div>
            }
            {managedVideoDeleteConsideration &&
            <div>
                <p style={{
                    color: 'red'
                }}>Are you sure you want to delete this video? This cannot be undone.</p>
                <span><button style={{
                    width: '100px',
                    textAlign: 'center',
                    marginRight: '10px',
                    backgroundColor: 'red'
                }}
                onClick={
                    (event) => {
                        deleteVideo();
                    }
                }
                >Yes</button>
                <button style={{
                    width: '100px',
                    textAlign: 'center'
                }}
                onClick={
                    (event) => {setManagedVideoDeleteConsideration(false)}
                }>No</button></span>
            </div>
            }
        </>
      )}
      <br></br>
      {managedVideos &&
        managedVideos.map((value, index, array) => (
          <>
          <button
            onClick={(event) => {
                setManagedVideo(value);
                setManagedVideoTitle("");
                setManagedVideoDescription("");
            }}
          >
            {value.name}
          </button>
          <br></br>
          </>
        ))}
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
      <br></br>
    </div>
    
  );
}
export default ManageVideos;