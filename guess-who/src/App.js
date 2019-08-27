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
  highScore: 0
};

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
        setState({ ...initialState, username: usernameData });
        props.history.push("/guesswho");
      })
      .catch(e => {
        console.log(e.response);
      });
  };

  console.log("the set data", state);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => <Login {...props} getLogin={getLogin} />}
      />
      <Route exact path="/register" component={Register} />

      <Route path="/guesswho" component={ProtectedGuessWhoPage} />
      <Route path="/questions" component={ProtectedQuestionList} />
      <Route
        path="/profile"
        render={props => (
          <ProtectedProfileCard {...props} username={state.username} />
        )}
      />
    </div>
  );
}

export default App;
