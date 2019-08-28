import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import QuestionList from "./components/Question/QuestionList";
import ProfileCard from "./components/Profile/ProfileCard";
import { axiosWithAuth } from "./utils/axiosWithAuth";

import "./App.css";
import GuessWhoPage from "./components/MainPage";

const protectRoute = Component => props => {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

const ProtectedGuessWhoPage = protectRoute(GuessWhoPage);
const ProtectedQuestionList = protectRoute(QuestionList);
const ProtectedProfileCard = protectRoute(ProfileCard);

const initialState = {
  username: "",
  token: "",
  userId: "",
  question: [],
  answer: [],
  tweet: "",
  tweeters: [],
  isLoading: false,
  error: "",
  highScore: 0,
  numberOfGuesses: 0,
  lives: 3
};

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function App(props) {
  const [state, setState] = useState(initialState);
  const [highScore, setHighScore] = useState(initialState);

  const getHighScore = values => {};

  const getLogin = values => {
    const url = "https://lambda-guess-who.herokuapp.com/api/auth/login";
    axiosWithAuth()
      .post(url, values)
      .then(res => {
        console.log("data from login:", res.config);
        localStorage.setItem("token", res.data.token);
        console.log("username", JSON.parse(res.config.data).username);
        let usernameData = JSON.parse(res.config.data).username;
        let tokenData = parseJwt(res.data.token);
        let highScoreData = JSON.parse(res.config.data).highScore;
        setState({
          ...initialState,
          username: usernameData,
          userId: tokenData.user.id,
          highScore: highScoreData
        });
        console.log(tokenData.user.id);
        props.history.push("/guesswho");
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  // console.log("the set data", state.username);
  // console.log("this is the state", state);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => <Login {...props} getLogin={getLogin} />}
      />
      <Route exact path="/register" component={Register} />

      <Route
        path="/guesswho"
        render={props => (
          <ProtectedGuessWhoPage
            {...props}
            highScore={state.highScore}
            username={state.username}
            setState={setState}
            state={state}
          />
        )}
      />
      <Route
        path="/questions"
        render={props => (
          <ProtectedQuestionList
            {...props}
            highScore={state.highScore}
            setState={setState}
            state={state}
          />
        )}
      />
      <Route
        path="/profile"
        render={props => (
          <ProtectedProfileCard
            {...props}
            username={state.username}
            highScore={state.highScore}
          />
        )}
      />
    </div>
  );
}

export default App;
