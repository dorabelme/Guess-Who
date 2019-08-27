import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";

const QuestionCard = props => {
  return (
    <div>
      <div className="top-row">
        <button></button>
        <img></img>
      </div>
      <Card className="question-card">
        <Image className="card-imgs" src={props.imgUrl}></Image>
        <Card.Content className="card-content">
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>@{props.handle}</Card.Meta>
          <div className="followerCount">
            <Icon name="users" />
            Followers: {props.followers}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default QuestionCard;
