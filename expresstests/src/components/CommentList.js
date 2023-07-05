import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import AddComment from "./AddComment";
import ReplyComment from "./ReplyComment";
import "../styling/VideoSelect.css";
function CommentList(props) {
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
    commentReply,
    setCommentReply,
  } = useContext(GlobalContext);
  useEffect(() => {
    if (comments && commentUsers && comments.length === commentUsers.length) {
      console.log("commentUsers");
      console.log(comments);
      comments.map((value, index, array) => {
        axios
          .get(`http://localhost:5000/api/currentuser${video.id}`)
          .then((res) => {
            //setCommentUsers(res.data[0]);
          });
        axios
          .get(`http://localhost:5000/api/getcomment${value.replytargetid}`)
          .then((res) => {
            //setCommentUsers(res.data[0]);
          });
      });
    }
  }, [comments, commentUsers, commentReply, currentUser]);
  return (
    <div>
      <h1>Comments ({comments.length})</h1>
      {comments != [] &&
        commentUsers != [] &&
        comments.map((value, index, array) => (
          <>
            <div
              style={{
                backgroundColor: "#007bff",
                color: "white",
                width: "1000px",
                borderRadius: "25px",
              }}
            >
              {comments && <p>{value.user}: </p>}
              <p>{value.text}</p>
              <p id="CommentCaption">Commented on: {value.dateposted}.</p>
              {value.replytargetid != -1 && (
                <>
                  <p id="CommentCaption">
                    Replied to{" "}
                    {
                      comments.find((val, ind, arr) => {
                        return val.id === value.replytargetid;
                      }).user
                    }
                    's comment:
                  </p>
                  <p id="CommentCaption">
                    {
                      comments.find((val, ind, arr) => {
                        return val.id === value.replytargetid;
                      }).text
                    }
                  </p>
                </>
              )}
              {!commentReply && currentUser.username && (
                <button
                  id="PostComment"
                  onClick={(event) => {
                    setCommentReply(<AddComment />);
                    setReplyTarget(value.id);
                  }}
                  style={{
                    backgroundColor: "blue",
                  }}
                >
                  Reply
                </button>
              )}
              {commentReply && replyTarget && replyTarget === value.id && (
                <ReplyComment
                  user={currentUser.username}
                  target={replyTarget}
                ></ReplyComment>
              )}
            </div>
            <br></br>
          </>
        ))}
    </div>
  );
}
export default CommentList;
