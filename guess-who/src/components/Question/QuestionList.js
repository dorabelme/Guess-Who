import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import "semantic-ui-css/semantic.min.css";
import QuestionCard from "./QuestionCard";

const QuestionList = () => {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState([]);

  const [candidates, setCandidates] = useState([]);

  const [guess, setGuess] = useState("");

  const [score, setScore] = useState(0);

  const [changeQuestion, setChangeQuestion] = useState(false);

  const [tries, setTries] = useState(3);

  const [gameover, setGameover] = useState(false);

  useEffect(() => {
    if (guess === answer) {
      setScore(score + 100);
      setChangeQuestion(!changeQuestion);
    } else if (tries <= 0) {
      setGameover(true);
    } else {
      tries--;
    }

    if (gameover) {
      setGameover(false);
    }
  }, [guess]);

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
  }, [changeQuestion]);

  return (
    <div>
      <p>{question}</p>
      {candidates.map(candidate => (
        <QuestionCard
          question={question}
          imgUrl={candidate.id.profile_image_url}
          name={candidate.id.name}
          handle={candidate.handle}
          onClick={setGuess(candidate.name)}
        />
      ))}
    </div>
  );
};
