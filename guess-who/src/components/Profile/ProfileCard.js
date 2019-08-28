import React, { useState, useEffect } from "react";
import axios from 'axios';
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NavbarMain from "../Navbar/Navbar2";
import "../Navbar/navbarTwo.scss";
import GuessWhoPage from '../GuessWhoPage';
import { Route, NavLink } from "react-router-dom";
import "./Profile.scss";

//Dummy Data before state is able to be passed from login
const profile = {
	avatar: "https://react.semantic-ui.com/images/avatar/large/elliot.jpg",
	header: "My Profile: ",
	description:
		'I want to tweet the very best. '



	// 	//name: "William",
	// 	// score: "35",
	// 	// settings: "Settings",
	// 	share: "Share Icon to Twitter"
}
export default function ProfileCard({ username, highScore }) {
	// const [avatar, getAvatar] = useState({})

	const newScores = highScore;
	// const divStyle = {
	// 	width: `${newScores}`,
	// 	backgroundColor: '#4CAF50 !important',
	// 	textAlign: 'right',
	// 	paddingTop: '10px',
	// 	paddingBottom: '10px',
	// 	color: 'white'

	// };

		highScore = highScore + 3;
		const newScores = highScore * 10;

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

			<NavbarMain />
		<NavLink exact to="/guesswho"> <button class="ui left labeled icon button"> 
				<i class="left arrow icon"></i>
				Go Back
			</button>
		</NavLink>	
			<div className="profile-card">
				<Card>
					<Image src={profile.avatar} />
					<Card.Content>
						<Card.Header><h1 className="userName">{username}</h1></Card.Header>
						<h2>{profile.header}</h2>
						<div class="container">

							<div className="skills scores" /></div>
						<h2>{newScores} Tweety Points!</h2>
						{/*profile.settings*/}
						<h3>{100 - newScores} points till the next level!</h3>
						<h3>About me: {profile.description}</h3>
					</Card.Content>
				</Card>
			</div>
		</>


	);
}
