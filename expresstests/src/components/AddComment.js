import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import "../styling/VideoSelect.css";
function AddComment(props) {
  const {
    videos,
    setVideos,
    videoSrcs,
    setVideoSrcs,
    video,
    setVideo,
    selectedVideo,
    setSelectedVideo,
    videoThumbnails,
    setVideoThumbnails,
    videoLoaded,
    setVideoLoaded,
    videoPage,
    setVideoPage,
    videoCount,
    setVideoCount,
    commentText,
    setCommentText,
    currentUser,
    setCurrentUser,
    comments,
    setComments,
    commentUsers,
    setCommentUsers,
    replyTarget,
    setReplyTarget,
    currentUserId,
    setCurrentUserId,
  } = useContext(GlobalContext);
  useEffect(() => {
    setReplyTarget("");
  }, [comments, currentUser, commentUsers]);
  const cookies = new Cookies();
  const postComment = (event) => {
    if (commentText) {
      console.log("post");
      const now = new Date();
      const year = now.getFullYear();
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      const day = ("0" + now.getDate()).slice(-2);
      const hours = ("0" + now.getHours()).slice(-2);
      const minutes = ("0" + now.getMinutes()).slice(-2);
      const seconds = ("0" + now.getSeconds()).slice(-2);
      const currentDateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      axios.post(`http://localhost:3000/api/comments/`, {
        text: commentText,
        user: currentUser.username,
        videoid: video.id,
        dateposted: currentDateTimeString,
        replytargetid: -1,
      });
      axios
        .get(`http://localhost:5000/api/currentuser${currentUserId}`)
        .then((res) => {
          //console.log(res.data[0].username);
          setCurrentUser(res.data[0]);
        });
      setCommentText("");
      setComments([]);
      axios
        .get(`http://localhost:5000/api/videocomments${video.id}`)
        .then((res) => {
          //console.log(res.data);
          setComments(res.data);
          res.data.map((value, index, array) => {
            axios
              .get(`http://localhost:5000/api/currentuser${value.uid}`)
              .then((res) => {
                //console.log(res.data[0].username);
                commentUsers.push(res.data[0]);
              });
          });
        });
    }
  };
  return (
    <div>
      <h3>Add a Comment</h3>
      <p>{props.user}:</p>
      <textarea
        id="commentBox"
        maxLength="5000"
        placeholder="Post a comment..."
        className="form-control mb-2"
        value={commentText}
        style={{
          width: "500px",
        }}
        onChange={(event) => {
          setCommentText(event.target.value);
        }}
      ></textarea>
      <br></br>
      <input
        type={"submit"}
        value={"Post"}
        onClick={(event) => {
          postComment(event);
        }}
      ></input>
    </div>
  );
}
export default AddComment;
