import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./mainpage.scss";

import Navbar from "./Navbar/Navbar";

const MainPage = props => {
  const handleSubmit = () => {
    const url = "https://lambda-guess-who.herokuapp.com/amIAuthed";
    axiosWithAuth()
      .get(url)
      .then(res => {
        console.log(res);
        // localStorage.setItem("token", res.data.payload);
        props.history.push("/questions");
      })
      .catch(e => {
        console.log(e.response);
      });
  };
  return (
    <>
      <Navbar />
      <div className="upperNav">
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
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
