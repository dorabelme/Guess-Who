import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { axiosWithAuth } from "./utils/axiosWithAuth";

import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import GuessWhoPage from "./components/DashBoard/Dashboard";
import QuestionList from "./components/Question/QuestionList";
import ProfileCard from "./components/Profile/ProfileCard";

import "./App.css";

// authorization
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

// initialState
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

// function to parse token and get id
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

// App
function App(props) {
  const [state, setState] = useState(initialState);

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
        setState({
          ...initialState,
          username: usernameData,
          userId: tokenData.user.id
        });
        console.log(tokenData.user.id);
        props.history.push("/guesswho");
      })
      .catch(e => {
        console.log(e.response);
      });
  };
  useEffect(() => {
    axiosWithAuth()
      .get(
        `https://lambda-guess-who.herokuapp.com/api/user/highscore/${state.userId}`
      )
      .then(res => {
        setState(setState({ ...initialState, highScore: res.data }));
      })
      .catch(err => console.log(err.response));
  }, []);

  console.log("the set data", state.username);
  console.log("this is the state", state);

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
          <ProtectedGuessWhoPage {...props} username={state.username} />
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
