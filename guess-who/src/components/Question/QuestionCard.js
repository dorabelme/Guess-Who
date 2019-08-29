import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";

const QuestionCard = props => {

  const defaultClass = "candidate-card";
  const correctAnswer = "candidate-card correctAnswer";
  const incorrectAnswer = "candidate-card wrongAnswer";

  const addDefaultSrc =(ev) => {
    ev.target.src = "./birdLogo.jpeg";
  }

  function click(event) {
    props.selectCandidate(event, props.id);
  }

  function setClass() {
    if (props.highlightCorrectAnswer && props.id === props.answer.id_str) {
      return correctAnswer;
    } else if (props.highlightCorrectAnswer && props.id !== props.answer.id_str && props.selectedCandidate === props.id) {
      return incorrectAnswer;
    } else {
      return defaultClass;
    }
  }

  return (
    <div onClick={click}>
      <Card className={setClass()}>
        <Image className="card-imgs" src={props.imgUrl} onError={addDefaultSrc}></Image>
        <Card.Content className="card-content">
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>@{props.handle}</Card.Meta>
          <div className="follower-count">
            <Icon name="users" />
            Followers: {props.followers}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default QuestionCard;