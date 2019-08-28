import React, { useState, useEffect } from "react";
import axios from 'axios';
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Profile.scss";

//Dummy Data before state is able to be passed from login
	const profile = {
	avatar: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
// 	//name: "William",
// 	// score: "35",
// 	// settings: "Settings",
// 	share: "Share Icon to Twitter"
 }








export default function ProfileCard({username, highScore}) {
// const [avatar, getAvatar] = useState({})

// 	const yourAvatar = () => {
// 		axios()
// 		.get("https://dog.ceo/api/breeds/image/random/")
// 		  .then(response => {
// 			getAvatar(response.data);
// 			console.log("DataINeed", response);
// 		  })
// 		  .catch(error => {
// 			console.log(error.message);
// 		  });
// 		  yourAvatar();
// 	  }
	// const ProfileCard = props => {
	//   //state set for profile data
	//   const [profile, setProfile] = useState([]);
	// State set for profile image
	//   //state set for username
	//   const [name, setName] = useState("name here");
	//   //state set for score
	//   const [score, SetScore] = useState([]);
	//   //state set for changing user settings
	//   const [settings, getSettings] = useState([]);
return (
		<>
{/* {profile.map(profiles => {
        return <ProfileCard key={profiles.config} profiles={profiles} />;
	  })} 
	 }; 
	  */}
	<div className="profile-card">
		<Card>
			<Image src={profile.avatar}/>
			<Card.Content>
				<Card.Header><h1>{username}</h1></Card.Header>
				<h2>{highScore}</h2>
				{/*profile.settings*/}
				<h1>Share to Twitter</h1>
			</Card.Content>
		</Card>
	</div>
	</>


	);
	}
