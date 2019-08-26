import React from "react";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const QuestionCard = props => {
  return (
    <div>
      <Card>
        <Image src={props.imgUrl}></Image>
        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Meta>{props.handle}</Card.Meta>
        </Card.Content>
      </Card>
    </div>
  );
};

export default QuestionCard;
