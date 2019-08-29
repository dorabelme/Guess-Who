import React from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image, Label, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./dashboard.scss";
// import { UserContext } from "../contexts/UserContext";
import NavbarMain from "../Navbar/Navbar2";
import FriendCard from "./FriendCard";

let friendList = [
  {
    username: "richards",
    id: "5d65cf2bdc88360017ea1e1b",
    imgSrc: "./richard.jpg",
    highscore: 0
  },
  {
    username: "dorab",
    id: "5d66f018f66ac900174b2b2d",
    imgSrc: "./dora.jpg",
    highscore: 0
  },
  {
    username: "deejayeaster",
    id: "5d6414d32c7f870017924f82",
    imgSrc: "./deejay.png",
    highscore: 0
  },
  {
    username: "taran",
    id: "5d643bea4ec62500173c50cd",
    imgSrc: "./taran.png",
    highscore: 0
  }
];

const MainPage = ({history, username}) => {

  const getHighScores = (user) => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${user.id}`)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }

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
      <NavbarMain username={username} />
      <div className="upperNav">
        <Link to="/profile">
          <div className="profile-pin">
            <Card.Content>
              <Card.Header>{username}</Card.Header>
            </Card.Content>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
              size="small"
            />
          </div>
        </Link>
      </div>
      <div>
        <Button type="submit" className="btn" onClick={handleSubmit}>Play</Button>
      </div>
      <div className="highscore-list">
        {friendList.map(player => (
          <FriendCard 
            key={player.id}
            username={player.username}
            id={player.id}
            imgSrc={player.imgSrc}
            highscore={getHighScores(player)}
          />
        ))}
      </div>
    </Card>
  );
};

export default MainPage;
