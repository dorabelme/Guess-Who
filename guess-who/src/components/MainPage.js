import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./mainpage.scss";
// import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar/Navbar";
import NavbarMain from "./Navbar/Navbar2";

const MainPage = props => {
	const handleSubmit = () => {
		const url = "https://lambda-guess-who.herokuapp.com/amIAuthed";
		axiosWithAuth()
			.get(url)
			.then(res => {
				console.log("on submit:", res);
				// localStorage.setItem("token", res.data.payload);
				props.history.push("/questions");
			})
			.catch(e => {
				console.log(e.response); gitr
			});
	};
	return (
		<>
			<NavbarMain />
			<div className="upperNav">
				<Card>
					<Image
						src="https://avatars2.githubusercontent.com/u/48419097?s=460&v=4"
						size="small"
						circular
					/>
					<Card.Content>
						<Card.Header>Player</Card.Header>
					</Card.Content>
				</Card>
				<button type="submit" className="btn" onClick={handleSubmit}>
					Play
        </button>
			</div>
		</>
	);
};

export default MainPage;
