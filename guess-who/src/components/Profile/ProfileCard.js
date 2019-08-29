import React from "react";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./profile.scss";
import NavbarFour from "../Navbar/Navbar4";
import ProgressBar from "./ProgressBar";

//Dummy Data before state is able to be passed from login
const profile = {
	avatar:
		"https://www.m2.com.lb/modules//smartblog/images/139.jpg",
	header: "My Profile: ",
	description: "I want to tweet the very best. "
};
export default function ProfileCard({ userName, highScore }) {
	console.log(userName, highScore )
	// const [avatar, getAvatar] = useState({})

	const newScores = highScore;

	return (
		<>
			<NavbarFour userName={userName} />

			<div className="profile-card">
				<Card>
					<Image src={profile.avatar} />
					<Card.Content>
						<Card.Header>
							<h1 className="userName">{userName}</h1>
						</Card.Header>
						{/* <h2>{profile.header}</h2> */}
						<ProgressBar percentage={newScores} />
						<div class="container">
							<div className="skills scores" />
						</div>
						<h3>{10 - newScores} points till the next level</h3>
						<h2>{newScores} Tweety Points</h2>
						<h3>Bio: {profile.description}</h3>
						{/*profile.settings*/}
					</Card.Content>
				</Card>
			</div>
		</>
	);
}

