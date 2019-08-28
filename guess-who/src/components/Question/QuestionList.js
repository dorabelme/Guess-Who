import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Button, Label, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";
import QuestionCard from "./QuestionCard";
import NavbarThree from "../Navbar/Navbar3";

const QuestionList = ({ username, highScore, setState, state }) => {
  let [question, setQuestion] = useState("");

  let [answer, setAnswer] = useState([]);

  let [candidates, setCandidates] = useState([]);

  let [imgUrl, setImgUrl] = useState("");

  let [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  let [selectedCandidate, setSelectedCandidate] = useState("");

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

  function delay(f) {
    setTimeout(f, 3000);
  }

  function selectCandidate(event, id) {
    setHighlightCorrectAnswer(true);
    setSelectedCandidate(id);

    if (id === answer.id_str) {
      const newLives = Math.min(state.lives + 1, 3);

      delay(
        () => {
          setState({ ...state, highScore: highScore + 100, numberOfGuesses: state.numberOfGuesses + 1, lives: newLives });
          setHighlightCorrectAnswer(false);
        }
      );         
    } else {
      const newLives = Math.max(state.lives - 1, 0);
      delay(
        () => {
          setState({ ...state, numberOfGuesses: state.numberOfGuesses + 1, lives: newLives });
          setHighlightCorrectAnswer(false);
        }
      );
    }
  }

  useEffect(() => {
    axiosWithAuth()
      .get("https://lambda-guess-who.herokuapp.com/api/question")
      .then(res => {
        console.log(res);
        setQuestion(res.data.question);
        setCandidates(res.data.candidates);
        setAnswer(res.data.answer);
      })
      .catch(err => console.log(err.response));
  }, [state]);

  return (
    <Card className="question-list-card">
      <NavbarThree highScore={highScore} lives={state.lives} />
      <div className="opponents">
        <Label color="teal" image>
          <img src="./birdLogo.jpeg" />
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
        <Label color="teal" image>
          <img src="./birdLogo.jpeg" />
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
        <Label color="teal" image>
          <img src="./birdLogo.jpeg" />
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
        <Label color="teal" image>
          <img src="./birdLogo.jpeg" />
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
      </div>
      <div className="question">
        <h2>Who's Tweet is it?</h2>
        <p>"{question}"</p>
      </div>
      <div className="candidate-card-div">
        {candidates.map(candidate => (
          //question cards are not yet clickable/do not have a link
          <QuestionCard answer={answer}
            selectCandidate={selectCandidate}
            id={candidate.id.id_str}
            key={Math.random().toString(36).substring(7)}
            question={question}
            imgUrl={candidate.id.profile_image_url.replace("normal", "bigger")}
            name={candidate.id.name}
            handle={candidate.handle}
            followers={candidate.id.followers_count}
            highlightCorrectAnswer={highlightCorrectAnswer}
            selectedCandidate={selectedCandidate}
          />
        ))}
      </div>
    </Card>
  );
};
export default QuestionList;

