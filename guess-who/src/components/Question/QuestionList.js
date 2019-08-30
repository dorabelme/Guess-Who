import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Card, Button, Label, Image, Modal } from "semantic-ui-react";

import "./question.scss";
import "../../assets/animate.css";
import QuestionCard from "./QuestionCard";
import NavbarThree from "../Navbar/Navbar3";

import {
	getTweets,
	postScore,
	setNewHighScore,
	getUser,
	login,
	signup,
	restartGame,
	correctGuess,
	incorrectGuess,
	getPersonalHighScore
} from "../../actions/index";

const QuestionList = props => {
	const [openState, setOpenState] = useState({ open: false });

	let [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
	let [selectedCandidate, setSelectedCandidate] = useState("");

	const show = size => () => setOpenState({ size, open: true });
	const close = () => setOpenState({ open: false });

	function delay(f) {
		setTimeout(f, 2000);
	}

	function reset() {
		props.restartGame();
		close();
	}

	function selectCandidate(event, id) {
		setHighlightCorrectAnswer(true);
		setSelectedCandidate(id);
		if (id === props.answer.id_str) {
			delay(() => {
				props.correctGuess();
				setHighlightCorrectAnswer(false);
				props.getTweets();
			});
		} else {
			delay(() => {
				props.incorrectGuess();

				setHighlightCorrectAnswer(false);
				props.getTweets();

				if (props.lives == 1) {
					if (props.highScore >= props.personalHighScore) {
						putHighScores(props.highScore);
					}
					getHighScores();
					show("mini")();
				}
			});
		}
	}

	const getHighScores = () => {
		props.getPersonalHighScore(props.userId);
	};

	const putHighScores = highScore => {
		props.postScore(props.userId, highScore);
	};

	useEffect(() => {
		props.getTweets();
		getHighScores();
	}, []);

	return (
		<Card className="question-list-card">
			<NavbarThree highScore={props.highScore} lives={props.lives} />
			<Label color="yellow" image>
				{/* <img src="./birdLogo.jpeg" /> */}
				Score:
        <Label.Detail>{props.highScore}</Label.Detail>
			</Label>
			<div className="opponents">
				<div className="opponents-div-1">
					<Label color="teal" image>
						{/* <img src="./birdLogo.jpeg" /> */}
						{/* {props.username} */}
						<Label.Detail>High Score: {props.personalHighScore}</Label.Detail>
					</Label>
				</div>
			</div>
			<div className="question">
				<h2 className="animated heartBeat delay-2s">Who's Tweet is it?</h2>
				<p>"{props.question}"</p>
			</div>
			<div className="candidate-card-div">
				{props.candidates.map(candidate => (
					<QuestionCard
						answer={props.answer}
						selectCandidate={selectCandidate}
						id={candidate.id.id_str}
						key={Math.random()
							.toString(36)
							.substring(7)}
						question={props.question}
						imgUrl={candidate.id.profile_image_url.replace("normal", "bigger")}
						name={candidate.id.name}
						handle={candidate.handle}
						followers={candidate.id.followers_count}
						highlightCorrectAnswer={highlightCorrectAnswer}
						selectedCandidate={selectedCandidate}
					/>
				))}
			</div>
			<Modal size={openState.size} open={openState.open} onClose={close}>
				<Modal.Header>Game Over</Modal.Header>
				<Modal.Content>
					<p>You ran out of lives...</p>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={reset}
						positive
						icon="checkmark"
						labelPosition="right"
						content="Start a New Game"
					/>
					<Link to="guesswho">
						<Button negative>Finish</Button>
					</Link>
				</Modal.Actions>
			</Modal>
		</Card>
	);
};
const mapStateToProps = state => {
	return {
		...state,
		candidates: state.tweeters,
		question: state.tweet,
		userId: localStorage.getItem("userId")
	};
};
export default connect(
	mapStateToProps,
	{
		getTweets,
		postScore,
		setNewHighScore,
		getUser,
		login,
		signup,
		restartGame,
		correctGuess,
		incorrectGuess,
		getPersonalHighScore
	}
)(QuestionList);
