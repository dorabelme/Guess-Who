import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";

const ProfileCard = props => {
  //state set for profile data
  const [profile, setProfile] = useState([]);

  //   //State set for profile image
  //   const [imageProfile, getImageProfile] = useState([]);
  //   //state set for username
  //   const [name, setName] = useState("name here");
  //   //state set for score
  //   const [score, SetScore] = useState([]);
  //   //state set for changing user settings
  //   const [settings, getSettings] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://lambda-guess-who.herokuapp.com/api/user")
      .then(response => {
        setProfile(response.data.user);
        console.log(response.data.user);
      })
      .catch(error => console.log(error.response));
  }, []);
};
export default ProfileCard;
