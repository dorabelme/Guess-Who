import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import { Card, Button, Label, Image, Modal } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./Question.scss";
import "../../assets/animate.css";
import QuestionCard from "./QuestionCard";
import NavbarThree from "../Navbar/Navbar3";

const QuestionList = ({ username, highScore, setState, state }) => {
  const [openState, setOpenState] = useState({ open: false })
  const [personalScore, setPersonalScore] = useState()
  
  let [question, setQuestion] = useState("");
  let [answer, setAnswer] = useState([]);
  let [candidates, setCandidates] = useState([]);
  let [highlightCorrectAnswer, setHighlightCorrectAnswer] = useState(false);
  let [selectedCandidate, setSelectedCandidate] = useState("");


  const show = (size) => () => setOpenState({ size, open: true })
  const close = () => setOpenState({ open: false })

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
      delay(
        () => {
          setState({ ...state, highScore: highScore + 1, numberOfGuesses: state.numberOfGuesses + 1, lives: newLives });
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
            if (highScore >= personalScore) {
              putHighScores(highScore)
            }
            getHighScores()
            show('mini')()
          }
        }
      );
    }
  }

  const getHighScores = () => {
    axiosWithAuth()
      .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${state.userId}`)
      .then(res => {
        setPersonalScore(res.data)
      })
      .catch(err => console.log(err.response));
  }


  const putHighScores = (highScore) => {
    const json = { 'highscore' : highScore}
    axiosWithAuth()
      .put(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${state.userId}`, json)
      .then(res => {
        console.log(res);
      })
    .catch(err => console.log(err.response));
  }

  const getQuestions = () => {
    axiosWithAuth()
      .get("https://lambda-guess-who.herokuapp.com/api/question")
      .then(res => {
        console.log(res);
        setQuestion(res.data.question);
        setCandidates(res.data.candidates);
        setAnswer(res.data.answer);
      })
      .catch(err => console.log(err.response));
  }
  useEffect(() => {
    getQuestions()
  }, [state]);


  console.log(state.userId)

  return (

    <Card className="question-list-card">
      <NavbarThree highScore={highScore} lives={state.lives} />
      <Label color="red" image>

        {/* <img src="./birdLogo.jpeg" /> */}
        Score:
          <Label.Detail>{highScore}</Label.Detail>
      </Label>
      <div className="opponents">       
        <div className="opponents-div-1">
          <Label color="teal" image>
          {/* <img src="./birdLogo.jpeg" /> */}
          {username}
          <Label.Detail>Personal Highest Score: {personalScore}</Label.Detail>
        </Label>
        {/* <Label color="teal" image>
          Name
          <Label.Detail>Score</Label.Detail>
        </Label> */}
        </div>
          {/* <div className="opponents-div-2"> */}
        {/* <Label color="teal" image> */}
          {/* <img src="./birdLogo.jpeg" /> */}
          {/* Name */}
          {/* <Label.Detail>Score</Label.Detail> */}
        {/* </Label> */}
        {/* <Label color="teal" image> */}
          {/* <img src="./birdLogo.jpeg" />  */}
          {/* Name */}
          {/* <Label.Detail>Score</Label.Detail> */}
        {/* </Label> */}
      {/* </div>  */}
      </div>
      <div className="question">
        <h2 className="animated heartBeat delay-2s">Who's Tweet is it?</h2>
        <p>"{question}"</p>
      </div>
      <div className="candidate-card-div">
        {candidates.map(candidate => (
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

