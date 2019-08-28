import React from "react";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./profile.scss";

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


function ProfileCard({ username, highScore }) {
		// const [avatar, getAvatar] = useState({})

		highScore = highScore + 3;
		const newScores = highScore * 10;

		return (
			<>
				<div className="profile-card">
					<Card>
						<Image src={profile.avatar} />
						<Card.Content>
							<Card.Header><h1 className="userName">{username}</h1></Card.Header>
							<h2>{profile.header}</h2>
							<div class="container">
								<div className="skills scores">{newScores}</div>
							</div>

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

export default ProfileCard;