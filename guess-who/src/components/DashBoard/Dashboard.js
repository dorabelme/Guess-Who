import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Image, Label, Button, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./dashboard.scss";
import NavbarTwo from "../Navbar/Navbar2";
import FriendCard from "./FriendCard";


const MainPage = ({ history, userName, highScore }) => {
  const [richards, setRichard] = useState(0)
  const [dorab, setDorab] = useState(0)
  const [deejay, setDeejay] = useState(0)
  const [taran, setTaran] = useState(0)

  const scores = [richards, dorab, deejay, taran]

  const getHighScores1 = () => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/5d65cf2bdc88360017ea1e1b`)
      .then(res => {
        console.log(res.data)
        setRichard(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const getHighScores2 = () => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/5d66f018f66ac900174b2b2d`)
      .then(res => {
        console.log(res.data)
        setDorab(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const getHighScores3 = () => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/5d6414d32c7f870017924f82`)
      .then(res => {
        console.log(res.data)
        setDeejay(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const getHighScores4 = () => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/5d643bea4ec62500173c50cd`)
      .then(res => {
        
        setTaran(res.data)
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getHighScores1()
    getHighScores2()
    getHighScores3()
    getHighScores4()

  }, []);


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

  let friendList = [
    {
      username: "richards",
      id: "5d65cf2bdc88360017ea1e1b",
      imgSrc: "./richard.jpg",
      highscore: richards
    },
    {
      username: "dorab",
      id: "5d66f018f66ac900174b2b2d",
      imgSrc: "./dora.jpg",
      highscore: dorab
    },
    {
      username: "deejay",
      id: "5d6414d32c7f870017924f82",
      imgSrc: "./deejay.png",
      highscore: deejay
    },
    {
      username: "taran",
      id: "5d643bea4ec62500173c50cd",
      imgSrc: "./taran.png",
      highscore: taran
    },
  ];
  return (
    <Card className="dashboard-card">
      <NavbarTwo />
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
                highscore={player.highscore}
              />
            )
          )
        )}
      </div>
    </Card>
  );
};

export default MainPage;