import React from "react";
import { connect } from "react-redux";

import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Profile.scss";
import NavbarFour from "../Navbar/Navbar4";
import ProgressBar from "./ProgressBar";

//Dummy Data before state is able to be passed from login
const profile = {
	avatar: "https://www.m2.com.lb/modules//smartblog/images/139.jpg",
	header: "My Profile: ",
	description: "I want to tweet the very best. "
};
function ProfileCard(props) {
	// const [avatar, getAvatar] = useState({})

	const newScores = props.personalHighScore;

	return (
		<>
			<NavbarFour />

			<div className="profile-card">
				<Card>
					<Image src={profile.avatar} />
					<Card.Content>
						<Card.Header>
							<h1 className="userName">{props.username}</h1>
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

const mapStateToProps = state => {
	return {
		...state,
		username: state.username,
		userId: state.userId,
		token: state.token,
		personalHighScore: state.personalHighScore
	};
};

export default connect(
	mapStateToProps,
	{}
)(ProfileCard);
