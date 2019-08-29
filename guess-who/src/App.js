import React from "react";
import { connect } from 'react-redux';
import { Route, Redirect } from "react-router-dom";

import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import MainPage from "./components/DashBoard/Dashboard";
import QuestionList from "./components/Question/QuestionList";
import ProfileCard from "./components/Profile/ProfileCard";

import { getTweets, postScore, setNewHighScore, getUser, login, signup } from './actions/index';


import "./App.css";

// authorization
const protectRoute = Component => props => {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

const ProtectedMainPage = protectRoute(MainPage);
const ProtectedQuestionList = protectRoute(QuestionList);
const ProtectedProfileCard = protectRoute(ProfileCard);

// App
function App(props) {
  
  const getLogin = values => {
    props.login(values).then(res => { props.history.push("/guesswho"); return true })
  };

  const getSignup = values => {
    props.signup(values).then(res => { props.history.push("/guesswho"); return true })
  };

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${state.userId}`)
  //     .then(res => {
  //       setState(setState({ ...initialState, highScore: res.data })
  //       )
  //     })
  //     .catch(err => console.log(err.response));
  // }, []);

  console.log("the set data", props.username);

  
  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => <Login {...props} getLogin={getLogin} />}
      />

      <Route exact path="/register" render={props => <Register {...props} getSignup={getSignup} />} />

      <Route path="/guesswho" render={props => (
        <ProtectedMainPage {...props} />
      )}
      />
      <Route
        path="/questions"
        render={props => (
          <ProtectedQuestionList {...props} />
        )}
      />
      <Route
        path="/profile"
        render={props => (
          <ProtectedProfileCard {...props} />
        )}
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    tweet: state.tweet,
    tweeters: state.tweeters,
    highScore: state.highScore,
    username: state.username,
    userId: state.userId,
    token: state.token,
    personalHighScore: state.personalHighScore,
  }
}

export default connect(
  mapStateToProps,
  { getTweets, postScore, setNewHighScore, getUser, login, signup }
)(App);
