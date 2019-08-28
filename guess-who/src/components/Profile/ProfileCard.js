import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Profile.scss";

//Dummy Data before state is able to be passed from login
const profile = {
	avatar: "https://images.dog.ceo/breeds/whippet/n02091134_39.jpg",
	name: "William",
	score: "35",
	settings: "Settings",
	share: "Share Icon to Twitter"
}

function ProfileCard({username, highScore}) {



	// const ProfileCard = props => {
	//   //state set for profile data
	//   const [profile, setProfile] = useState([]);

	//   // State set for profile image
	//   const [avatar, getAvatar] = useState([]);
	//   //state set for username
	//   const [name, setName] = useState("name here");
	//   //state set for score
	//   const [score, SetScore] = useState([]);
	//   //state set for changing user settings
	//   const [settings, getSettings] = useState([]);

	//   useEffect(() => {
	//     axiosWithAuth()
	//       .get("https://lambda-guess-who.herokuapp.com/api/auth/login")
	//       .then(response => {
	//         setProfile(response.data);
	//         console.log("DataINeed", response);
	//       })
	//       .catch(error => {
	//         console.log(error.response);
	//       });
	//   }, []);

	return (
		<div className="profile-card">

			{/* {profile.map(profiles => {
        return <ProfileCard key={profiles.config} profiles={profiles} />;
	  })} 
	 }; 
	  */}
			<Card>
				<Image
					src={profile.avatar}

				/>
				<Card.Content>
					<Card.Header>{username}</Card.Header>
					<h2>{highScore}</h2>
					{profile.settings}
					<h1>Share to Twitter</h1>
				</Card.Content>
			</Card>
		</div>


	);
}
export default ProfileCard;
