import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "universal-cookie";
import AddComment from "./AddComment";
import ReplyComment from "./ReplyComment";
import "../styling/VideoSelect.css";

function ChangePassword(props) {
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
    changeOldPasswordIncorrect, setChangeOldPasswordIncorrect,
    changePasswordNotComplex, setChangePasswordNotComplex,
    changeConfirmPasswordBlank, setChangeConfirmPasswordBlank,
    changePasswordTooShort, setChangePasswordTooShort,
    changePasswordTooLong, setChangePasswordTooLong
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log(profileOldPassword);
  }, [profileOldPassword]);
  const bcrypt = require("bcryptjs");
  const oldPasswordCheck = () => {
    bcrypt
      .compare(profileOldPassword, currentUser.passwordsalt)
      .then((value) => {
        setProfileOldPasswordMatch(value);
        setChangeOldPasswordIncorrect(!value)

      }).catch((reason) => {
        console.error("Old passowrd is incorrect");
      });
  };
  const checkNewPassword = () => {
    const numregex = /\d/g;
    const spregex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    if (profileNewPassword === profileNewPasswordConfirm) {
      console.log(1);
      if(profileNewPassword.length >= 8 && profileNewPasswordConfirm.length >= 8 && profileNewPassword.length <= 255 && profileNewPasswordConfirm.length <= 255)
      {
        console.log(2);
        if (numregex.test(profileNewPassword) && spregex.test(profileNewPassword) && profileNewPassword.match(numregex).length >= 3 && profileNewPassword.match(spregex).length >= 3)
        {
          console.log(3);
          setProfileNewPasswordMatch(true);
          setChangePasswordNotComplex(false);
        }else{
          setChangePasswordNotComplex(true);
        }
      }
    } else {
      setProfileNewPasswordMatch(false);
    }
  };
  const changePassword = () => {
    if (profileOldPasswordMatch && profileNewPasswordMatch) {
          console.log(3);
          bcrypt.hash(profileNewPassword, 10).then((value) => {
            setProfilePasswordHash(value);
            axios.get(
              `http://localhost:5000/changepassword${currentUser.uid}/${value}`
            );
          });
          setPage("Profile");
        }
  };
  return (
    <div>
      <h1>Change Password</h1>
      <div className="form-floating">
        <label>Old Password</label>
        <input
          type="password"
          className="form-control mb-2"
          onKeyUp={(event) => {
            oldPasswordCheck();
          }}
          onChange={(event) => {
            setProfileOldPassword(event.target.value);
          }}
        />
        { changeOldPasswordIncorrect &&
          <p id={"ValidationText"}>Password is incorrect.</p>
        }
      </div>
      <div className="form-floating">
        <label>New Password</label>
        <input
          type="password"
          className="form-control mb-2"
          onKeyUp={(event) => {
            checkNewPassword();
          }}
          onChange={(event) => {
            setProfileNewPassword(event.target.value);
          }}
        />
        { !profileNewPassword &&
          <p id={"ValidationText"}>Password cannot be blank.</p>
        }
        { profileNewPassword && profileNewPassword.length < 8 &&
          <p id={"ValidationText"}>Password must have 8 characters or more.</p>
        }
        { profileNewPassword && profileNewPassword.length > 255 &&
          <p id={"ValidationText"}>Password cannot be more than 255 characters long.</p>
        }
        { changePasswordNotComplex &&
        <p id={"ValidationText"}>Password lacks complexity. Use at least 3 numbers (ex. 123 etc.) and at least 3 special characters (ex. !?@ etc.)</p>
        }
        </div>
      <div className="form-floating">
        <label>Confirm New Password</label>
        <input
          type="password"
          className="form-control mb-2"
          onKeyUp={(event) => {
            checkNewPassword();
          }}
          onChange={(event) => {
            setProfileNewPasswordConfirm(event.target.value);
          }}
        />
        { !profileNewPasswordConfirm &&
          <p id={"ValidationText"}>Confirm new password cannot be blank.</p>
        }
        { profileNewPasswordConfirm && !profileNewPasswordMatch &&
          <p id={"ValidationText"}>Passwords do not match.</p>
        }
      </div>
      <br></br>
      <div className="form-floating">
        <input
          type="submit"
          className="form-control mb-2"
          placeholder="Enter a name for your video..."
          onClick={(event) => {
            changePassword();
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
      <br></br>
    </div>
  );
}
export default ChangePassword;
