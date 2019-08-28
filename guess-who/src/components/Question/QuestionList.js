import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Button, Label, Image, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";
import "../../assets/animate.css";
import QuestionCard from "./QuestionCard";
import NavbarThree from "../Navbar/Navbar3";

<<<<<<< HEAD
const QuestionList = ({ username, highScore, setState, state }) => {
=======
const QuestionList = ({ history, username, highScore, setState, state }) => {
  const [openState, setOpenState] = useState({ open: false })

  const show = (size) => () => setOpenState({ size, open: true })
  const close = () => setOpenState({ open: false })

>>>>>>> 0ef54adfbfb90936491bfac31f81b145fb68c96f
  let [question, setQuestion] = useState("");

  let [answer, setAnswer] = useState([]);

  let [hearts, setHearts] = useState(3);

  let [candidates, setCandidates] = useState([]);

  let [imgUrl, setImgUrl] = useState("");

  let [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  let [selectedCandidate, setSelectedCandidate] = useState("");
<<<<<<< HEAD

  // let [guess, setGuess] = useState("");
=======
>>>>>>> 0ef54adfbfb90936491bfac31f81b145fb68c96f

  function delay(f) {
    setTimeout(f, 2000);
  }

  function reset() {
    setState({
      ...state, highScore: 0, numberOfGuesses: state.numberOfGuesses + 1, lives: 3
    })
    close();
  }

  function selectCandidate(event, id) {
    setHighlightCorrectAnswer(true);
    setSelectedCandidate(id);

    if (id === answer.id_str) {
      const newLives = Math.min(state.lives + 1, 3);

<<<<<<< HEAD
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
    setTimeout(f, 1000);
  }

  function selectCandidate(event, id) {
    setHighlightCorrectAnswer(true);
    setSelectedCandidate(id);

    if (id === answer.id_str) {
      const newLives = Math.min(state.lives + 1, 3);

      delay(() => {
        setState({
          ...state,
          highScore: highScore + 100,
          numberOfGuesses: state.numberOfGuesses + 1,
          lives: newLives
        });
        setHighlightCorrectAnswer(false);
      });
    } else {
      const newLives = Math.max(state.lives - 1, 0);
      delay(() => {
        setState({
          ...state,
          numberOfGuesses: state.numberOfGuesses + 1,
          lives: newLives
        });
        setHighlightCorrectAnswer(false);
      });
=======
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
          if (state.lives == 1) {
            show('mini')()
          }
        }
      );
>>>>>>> 0ef54adfbfb90936491bfac31f81b145fb68c96f
    }
  }

  const getHighScores = () => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${state.userId}`)
      .then(res => {
        console.log(res);
      })
      // .catch(err => console.log(err.response));
  }

  const getQuestions = () => {
    axiosWithAuth()
      .get("https://lambda-guess-who.herokuapp.com/api/question")
      .then(res => {
        console.log("question and answer:", res);
        setQuestion(res.data.question);
        setCandidates(res.data.candidates);
        setAnswer(res.data.answer);
      })
      .catch(err => console.log(err.response));
<<<<<<< HEAD
  }, [state]);
=======
  }
  // useEffect(() => {
  //   getQuestions()
  // }, [state]);

  useEffect(() => {
    getHighScores()
  }, [state]);

  console.log(state.userId)
>>>>>>> 0ef54adfbfb90936491bfac31f81b145fb68c96f

  return (

    <Card className="question-list-card">
      <NavbarThree highScore={highScore} lives={state.lives} />
      <div className="opponents">
<<<<<<< HEAD
        <div className="opponents-div-1">
          {/* I think we will have to ditch the multiplayer idea as the back end isnt set up for it */}
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
        <div className="opponents-div-2">
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
=======
      <div className="opponents-div-1">
        <Label color="teal" image>
          {/* <img src="./birdLogo.jpeg" /> */}
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
        <Label color="teal" image>
          {/* <img src="./birdLogo.jpeg" /> */}
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
        </div>
          <div className="opponents-div-2">
        <Label color="teal" image>
          {/* <img src="./birdLogo.jpeg" /> */}
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
        <Label color="teal" image>
          {/* <img src="./birdLogo.jpeg" /> */}
          Name
          <Label.Detail>Score</Label.Detail>
        </Label>
      </div>
>>>>>>> 0ef54adfbfb90936491bfac31f81b145fb68c96f
      </div>
      <div className="question">
        <h2 className="animated heartBeat delay-2s">Who's Tweet is it?</h2>
        <p>"{question}"</p>
      </div>
      <div className="candidate-card-div">
        {candidates.map(candidate => (
          //question cards are not yet clickable/do not have a link
<<<<<<< HEAD
          <QuestionCard
            answer={answer}
            selectCandidate={selectCandidate}
            id={candidate.id.id_str}
            key={Math.random()
              .toString(36)
              .substring(7)}
=======
          <QuestionCard answer={answer}
            selectCandidate={selectCandidate}
            id={candidate.id.id_str}
            key={Math.random().toString(36).substring(7)}
>>>>>>> 0ef54adfbfb90936491bfac31f81b145fb68c96f
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
      <Modal size={openState.size} open={openState.open} onClose={close}>
        <Modal.Header>Game Over</Modal.Header>
         <Modal.Content>
          <p>You ran out of lives...</p>
        </Modal.Content> 
        <Modal.Actions>
         <Button onClick={reset}
            positive
            icon='checkmark'
            labelPosition='right'
            content='Start a New Game'
          />
          <Link to="guesswho"><Button negative>Finish</Button></Link>
        </Modal.Actions>
      </Modal>
    </Card>
  );
};
export default QuestionList;
