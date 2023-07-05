import logo from "./logo.svg";
import "./App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "./contexts/GlobalContext";
import VideoSelect from "./components/VideoSelect";
import UploadVideo from "./components/UploadVideo";
import NavigationBar from "./components/NavigationBar";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import AddComment from "./components/AddComment";
import ChangeAvatar from "./components/ChangeAvatar";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import ManageVideos from "./components/ManageVideos";

function App() {
  const [videos, setVideos] = React.useState([]);
  const [videoSrcs, setVideoSrcs] = React.useState([]);
  const [video, setVideo] = React.useState(undefined);
  const [videoName, setVideoName] = React.useState([]);
  const [videoDescription, setVideoDescription] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState([]);
  const [page, setPage] = React.useState("Home");
  const [videoThumbnails, setVideoThumbnails] = React.useState([]);
  const [newUsername, setNewUsername] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordCheck, setNewPasswordCheck] = React.useState("");
  const [newUsernameCheck, setNewUsernameCheck] = React.useState(false);
  const [newHashedPassword, setNewHashedPassword] = React.useState("");
  const [newLogInUsername, setNewLogInUsername] = React.useState("");
  const [logInUsernameExists, setLogInUsernameExists] = React.useState(false);
  const [logInPasswordMatches, setLogInPasswordMatches] = React.useState(false);
  const [newLogInPassword, setNewLogInPassword] = React.useState("");
  const [logInUsers, setLogInUsers] = React.useState("");
  const [currentUserId, setCurrentUserId] = React.useState("");
  const [videoLoaded, setVideoLoaded] = React.useState(true);
  const [videoPage, setVideoPage] = React.useState(0);
  const [videoCount, setVideoCount] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [currentVideoUser, setCurrentVideoUser] = React.useState([]);
  const [commentText, setCommentText] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [commentUsers, setCommentUsers] = React.useState([]);
  const [replyTarget, setReplyTarget] = React.useState("");
  const [commentReply, setCommentReply] = React.useState("");
  const [commentPage, setCommentPage] = React.useState(0);
  const [registerAvatarFile, setRegisterAvatarFile] = React.useState("");
  const [changeAvatarFile, setChangeAvatarFile] = React.useState();
  const [profileOldPassword, setProfileOldPassword] = React.useState("");
  const [profileNewPassword, setProfileNewPassword] = React.useState("");
  const [profileNewPasswordConfirm, setProfileNewPasswordConfirm] =
    React.useState("");
  const [profileOldPasswordMatch, setProfileOldPasswordMatch] =
    React.useState(false);
  const [profileNewPasswordMatch, setProfileNewPasswordMatch] =
    React.useState(false);
  const [profilePasswordHash, setProfilePasswordHash] = React.useState(false);
  const [managedVideosPage, setManagedVideosPage] = React.useState(0);
  const [managedVideos, setManagedVideos] = React.useState("");
  const [managedVideo, setManagedVideo] = React.useState(undefined);
  const [managedVideoTitle, setManagedVideoTitle] = React.useState("");
  const [managedVideoDescription, setManagedVideoDescription] =
    React.useState("");
  const [managedVideoDeleteConsideration, setManagedVideoDeleteConsideration] =
    React.useState(false);
  const [managedVideoDeleteCheck, setManagedVideoDeleteCheck] =
    React.useState(false);
  const [registerConfirmPasswordMismatch, setRegisterConfirmPasswordMismatch] =
    React.useState(false);
  const [registerPasswordBlank, setRegisterPasswordBlank] =
    React.useState(false);
  const [registerPasswordTooShort, setRegisterPasswordTooShort] =
    React.useState(false);
  const [registerPasswordTooLong, setRegisterPasswordTooLong] =
    React.useState(false);
  const [registerConfirmPasswordBlank, setRegisterConfirmPasswordBlank] =
    React.useState(false);
  const [registerUsernameBlank, setRegisterUsernameBlank] =
    React.useState(false);
  const [registerUsernameTooShort, setRegisterUsernameTooShort] =
    React.useState(false);
  const [registerUsernameTooLong, setRegisterUsernameTooLong] =
    React.useState(false);
  const [registerPasswordNotComplex, setRegisterPasswordNotComplex] =
    React.useState(false);
  const [loginPasswordIncorrect, setLoginPasswordIncorrect] =
    React.useState(false);
  const [usernameNotFound, setUsernameNotFound] =
    React.useState(false);
  const [usernameAlreadyExists, setUsernameAlreadyExists] =
    React.useState(false);
  const [changeOldPasswordIncorrect, setChangeOldPasswordIncorrect] =
    React.useState(false);
  const [changePasswordNotComplex, setChangePasswordNotComplex] =
    React.useState(false);
  const [changeConfirmPasswordBlank, setChangeConfirmPasswordBlank] =
    React.useState(false);
  const [changePasswordTooShort, setChangePasswordTooShort] =
    React.useState(false);
  const [changePasswordTooLong, setChangePasswordTooLong] =
    React.useState(false);
  useEffect(() => {}, []);
  return (
    <div className="App" style={{
      backgroundColor: 'aliceBlue'
    }}>
      <GlobalContext.Provider
        value={{
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
          newUsernameCheck,
          setNewUsernameCheck,
          logInUsernameExists,
          setLogInUsernameExists,
          logInPasswordMatches,
          setLogInPasswordMatches,
          logInUsers,
          setLogInUsers,
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
          commentText,
          setCommentText,
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
          registerAvatarFile,
          setRegisterAvatarFile,
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
          managedVideoDeleteCheck,
          setManagedVideoDeleteCheck,
          managedVideoDeleteConsideration,
          setManagedVideoDeleteConsideration,
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
          usernameAlreadyExists, setUsernameAlreadyExists,
          changeOldPasswordIncorrect, setChangeOldPasswordIncorrect,
          changePasswordNotComplex, setChangePasswordNotComplex,
          changeConfirmPasswordBlank, setChangeConfirmPasswordBlank,
          changePasswordTooShort, setChangePasswordTooShort,
          changePasswordTooLong, setChangePasswordTooLong
        }}
      >
        <NavigationBar></NavigationBar>
        {page == "Profile" && <Profile user={currentUser}></Profile>}
        {page == "Videos" && <VideoSelect></VideoSelect>}
        {page == "Upload" && <UploadVideo></UploadVideo>}
        {page == "Register" && <Register></Register>}
        {page == "LogIn" && <LogIn></LogIn>}
        {page == "ChangeAvatar" && <ChangeAvatar></ChangeAvatar>}
        {page == "ChangePassword" && <ChangePassword></ChangePassword>}
        {page == "ManageVideos" && <ManageVideos></ManageVideos>}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
