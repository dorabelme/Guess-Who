import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const ProfileCard = props => {
  console.log(props);
  //state set for profile data
  const [profile, setProfile] = useState([]);

  // State set for profile image
  const [imageProfile, getImageProfile] = useState([]);
  //state set for username
  const [name, setName] = useState("name here");
  //state set for score
  const [score, SetScore] = useState([]);
  //state set for changing user settings
  const [settings, getSettings] = useState([]);

  /* 
  
  

  */

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get("https://lambda-guess-who.herokuapp.com/api/auth/login")
  //     .then(response => {
  //       setProfile(response.data);
  //       console.log("DataINeed", response);
  //     })
  //     .catch(error => {
  //       console.log(error.response);
  //     });
  // }, []);

  return (
    <div className="profile-card">
      <h1>{props.username}</h1>
    </div>
  );
};
export default ProfileCard;
