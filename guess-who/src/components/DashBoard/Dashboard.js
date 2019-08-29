import React from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image, Label, Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./dashboard.scss";
import NavbarMain from "../Navbar/Navbar2";
import FriendCard from "./FriendCard";

let friendList = [
  {
    id: "5d65cf2bdc88360017ea1e1b"
  },
  {
    id: "5d66f018f66ac900174b2b2d"
  },
  {
    id: "5d6414d32c7f870017924f82"
  },
  {
    id: "5d643bea4ec62500173c50cd"
  }
];

const MainPage = ({ history, userName, highScore }) => {
  console.log("this is the user name on dash", userName);
  const getHighScores = user => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/${user.id}`)
      .then(res => {
        console.log("the res data", res);
      })
      .catch(err => console.log(err.response));
  };

  const handleSubmit = () => {
    const url = "https://lambda-guess-who.herokuapp.com/amIAuthed";
    axiosWithAuth()
      .get(url)
      .then(res => {
        console.log("on submit:", res);
        // localStorage.setItem("token", res.data.payload);
        history.push("/questions");
      })
      .catch(e => {
        console.log(e.response);
      });
  };
  return (
    <Card className="dashboard-card">
      <NavbarMain userName={userName} />
      <div className="upperNav">
        <Link to="/profile">
          <div className="profile-pin">
            <Image
              src="https://www.m2.com.lb/modules//smartblog/images/139.jpg"
              size="small"
            />
          </div>
        </Link>
        {/* <div>Username: {userName}</div> */}
      </div>
      <div>
        <Button type="submit" className="btn" onClick={handleSubmit} primary>
          Play
        </Button>
      </div>
      <div className="highscore-list">
        <div className="header">Top Highscores</div>
        {friendList.map(
          player => (
            console.log("player:", player),
            (
              <FriendCard
                key={player.id}
                username={player.username}
                id={player.id}
                imgSrc={player.imgSrc}
                highscore={highScore}
              />
            )
          )
        )}
      </div>
    </Card>
  );
};

export default MainPage;
