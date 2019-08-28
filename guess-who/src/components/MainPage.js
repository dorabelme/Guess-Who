import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./mainpage.scss";
// import { UserContext } from "../contexts/UserContext";
import Navbar from "./Navbar/Navbar";
import NavbarMain from "./Navbar/Navbar2";

const MainPage = props => {
  console.log("here are sdome props deejay", props);
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
        console.log(e.response);
      });
  };

  return (
    <>
      <NavbarMain />
      <div className="upperNav">
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
            size="small"
            circular
          />
          <Card.Content>
            <Card.Header>{props.username}</Card.Header>
          </Card.Content>
        </Card>
        <button type="submit" className="btn" onClick={handleSubmit}>
          Play
        </button>
      </div>
      <h4>highscore: {props.highScore}</h4>
    </>
  );
};

export default MainPage;
