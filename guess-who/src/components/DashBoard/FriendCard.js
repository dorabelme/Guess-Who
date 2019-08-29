import React from "react";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../Question/Question.scss";

const FriendCard = props => {
  return (
    <div>
      <Card>
        <Image className="card-imgs" src={props.imgSrc}></Image>
        <Card.Content className="card-content">
          <Card.Header>{props.username}</Card.Header>
          <Card.Meta>Highscore: {props.highscore}</Card.Meta>
        </Card.Content>
      </Card>
    </div>
  );
};

export default FriendCard;