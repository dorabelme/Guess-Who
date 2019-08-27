import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";
import QuestionCard from "./QuestionCard";

const QuestionList = () => {
  let [question, setQuestion] = useState("");

  let [answer, setAnswer] = useState([]);

  let [candidates, setCandidates] = useState([]);

  // let [guess, setGuess] = useState("");

  // let [score, setScore] = useState(0);

  // let [changeQuestion, setChangeQuestion] = useState(false);

  // let [tries, setTries] = useState(3);

  // let [gameover, setGameover] = useState(false);

  // useEffect(() => {
  //   if (guess === answer) {
  //     setScore(score + 100);
  //     setChangeQuestion(!changeQuestion);
  //   } else if (tries <= 0) {
  //     setGameover(true);
  //   } else {
  //     tries--;
  //   }

  //   if (gameover) {
  //     setGameover(false);
  //   }
  // }, [guess]);

  useEffect(() => {
    axiosWithAuth()
      .get("https://lambda-guess-who.herokuapp.com/api/question")
      .then(res => {
        console.log(res);
        setQuestion(res.data.question);
        setAnswer(res.data.answer);
        setCandidates(res.data.candidates);
      })
      .catch(err => console.log(err.response));
  }, []);

  return (
    <Card className="question-list-card">
      <Card.Description className="question">{question}</Card.Description>
      {candidates.map(candidate => (
        <QuestionCard
          key={candidate.id.id_str}
          question={question}
          imgUrl={candidate.id.profile_image_url}
          name={candidate.id.name}
          handle={candidate.handle}
          followers={candidate.id.followers_count}
        />
      ))}
    </Card>
  );
};

export default QuestionList;
