import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
import Cookies from "universal-cookie";
import "../styling/VideoSelect.css";

function VideoSelect() {
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
    currentUser,
    setCurrentUser,
    currentVideoUser,
    setCurrentVideoUser,
    comments,
    setComments,
    commentUsers,
    setCommentUsers,
    replyTarget,
    setReplyTarget,
    commentReply,
    setCommentReply,
    commentPage,
    setCommentPage,
  } = useContext(GlobalContext);
  let renders = 0;
  const cookies = new Cookies();
  useEffect(() => {
    renders++;
    setVideos([]);
    console.log("Render Video Select");
    //`http://localhost:5000/videos/${value}`
    axios
      .get(`http://localhost:5000/api/videos${videoPage}`)
      .then((res) => {
        //console.log(res);
        setVideos(res.data);
      })
      .catch((reason) => {});
    axios
      .get(`http://localhost:3000/api/videos/count`)
      .then((res) => {
        //console.log(res.data[0].no_of_rows);
        setVideoCount(res.data[0].no_of_rows);
      })
      .catch((reason) => {});
    try {
      axios
        .get(
          `http://localhost:5000/api/currentuser${
            cookies.get("WatchTimeAuthCookie").uid
          }`
        )
        .then((res) => {
          //console.log(res.data[0].username);
          setCurrentUser(res.data[0]);
        });
    } catch (ex) {
      console.error("Not signed in");
    }
    if (video) {
      axios
        .get(`http://localhost:5000/api/currentuser${video.uid}`)
        .then((res) => {
          //console.log("videouid");
          //console.log(res.data[0].username);
          setCurrentVideoUser(res.data[0]);
        });
    }
    console.log(comments);
    console.log(commentPage);
  }, [videoPage, video, commentUsers, comments, commentPage]);

  return (
    <div>
      {video && (
        <>
          <br></br>
          <video
            src={`http://localhost:5000/videos/${video.url}`}
            controls
            width={1000}
            onLoadedData={(event) => {
              setVideoLoaded(true);
            }}
            onError={(event) => {
              setVideoLoaded(false);
            }}
          ></video>
          {currentVideoUser && (
            <>
              <br></br>
              <img
                src={`http://localhost:5000/images/${currentVideoUser.avatarfilename}`}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              ></img>
              <h5>Video posted by {currentVideoUser.username}</h5>
            </>
          )}
          <h1>{video.name}</h1>
          <p>Description: </p>
          <p>{video.description}</p>
        </>
      )}
      {!videoLoaded && !video && <p>No video selected...</p>}
      {!videoLoaded && video && (
        <p>This video is currently processing. Please come back later.</p>
      )}
      <h1>{video && <span>More</span>} Videos</h1>
      <div>
        {videos &&
          videos.map((value, index, array) => (
            <>
              <button
                onClick={(event) => {
                  setVideo(value);
                  //console.log(value.id);
                  axios
                    .get(`http://localhost:5000/api/videocomments${value.id}`)
                    .then((res) => {
                      //console.log(res.data);
                      setComments(res.data);
                      res.data.map((value, index, array) => {
                        axios
                          .get(
                            `http://localhost:5000/api/currentuser${value.uid}`
                          )
                          .then((res) => {
                            //commentUsers.push(res.data[0]);
                          });
                      });
                    })
                    .catch((reason) => {});
                }}
              >
                {value.name}
              </button>
              <br></br>
            </>
          ))}
      </div>
      <span style={{ display: "block" }}>
        {videoPage > 0 && (
          <button
            style={{
              backgroundColor: "blue",
            }}
            onClick={(event) => {
              setVideoPage(videoPage - 5);
            }}
          >
            Previous
          </button>
        )}
      </span>
      <br></br>
      <div>
        {videoPage < videoCount && (
          <button
            style={{
              backgroundColor: "navy",
            }}
            onClick={(event) => {
              setVideoPage(videoPage + 5);
            }}
          >
            Next
          </button>
        )}
      </div>
      <div>
        <br></br>
        {video && (
          <>
            {currentUser && (
              <AddComment user={currentUser.username}></AddComment>
            )}
            <br></br>
            {comments != [] && (
              <CommentList></CommentList>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default VideoSelect;