import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Profile.scss";

//Dummy Data before state is able to be passed from login
const profile = {
	avatar: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
	name: "William",
	score: "35",
	settings: "Gear Icon",
	share: "Share Icon to Twitter"
}

function ProfileCard() {



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
			<Card className=".ui.card">
				<Image
					src={profile.avatar}
				/>
				<Card.Content>
					<Card.Header>{profile.name}</Card.Header>

				</Card.Content>
			</Card>

		</div>
	);
}
export default ProfileCard;
