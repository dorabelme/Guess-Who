import React, { useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";

const QuestionCard = props => {
  console.log("question card props:", props);
  const addDefaultSrc = ev => {
    ev.target.src = "./birdLogo.jpeg";
  };
  let [hearts, setHearts] = useState(props.hearts);
  return (
    <div>
      <Card
        className="candidate-card"
        onClick={() => {
          props.handle === props.answer.screen_name
            ? //toggle correct style and push to next question after 1 second

              console.log("yep")
            : // toggle incorrect style, toggle hideHeart style, push to next question or game over
              setHearts(hearts - 1);
          console.log("nope");
        }}
      >
        <Image
          className="card-imgs"
          src={props.imgUrl}
          onError={addDefaultSrc}
        ></Image>
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
