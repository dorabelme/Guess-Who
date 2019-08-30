import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./profile.scss";
import NavbarFour from "../Navbar/Navbar4";
import ProgressBar from "./ProgressBar";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
//Dummy Data before state is able to be passed from login
const profile = {
  avatar: "https://www.m2.com.lb/modules//smartblog/images/139.jpg",
  header: "My Profile: ",
  description: "I want to tweet the very best. "
};
function ProfileCard(props) {
  // const [avatar, getAvatar] = useState({})
  console.log("profile props", props);

  //   const newScores = props.personalHighScore;
  const [score, setScore] = useState();
  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://lambda-guess-who.herokuapp.com/api/user/highscore/5d6414d32c7f870017924f82`
      )
      .then(res => {
        console.log("score data", res.data);
        setScore(res.data);
      })
      .catch(err => console.log(err.response));
  });

  return (
    <>
      <NavbarFour />

      <div className="profile-card">
        <Card>
          <Image src={profile.avatar} />
          <Card.Content>
            <Card.Header>
              <h1 className="userName">{localStorage.getItem("username")}</h1>
            </Card.Header>
            {/* <h2>{profile.header}</h2> */}
            <ProgressBar percentage={score} />
            <div class="container">
              <div className="skills scores" />
            </div>
            <h3>{10 - score} points till the next level</h3>
            <h2>
              {isNaN(score) ? setScore(0) : score + " "}
              Tweety Points
            </h2>
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
    userId: state.userId,
    token: state.token,
    personalHighScore: state.personalHighScore
  };
};

export default connect(
  mapStateToProps,
  {}
)(ProfileCard);
