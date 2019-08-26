import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import QuestionCard from "./components/Question/QuestionCard";
// import ProfileCard from "./components/Profile/ProfileCard";

import "./App.css";
import GuessWhoPage from "./components/MainPage";

const protectRoute = Component => props => {
  if (localStorage.getItem("token")) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

const ProtectedGuessWhoPage = protectRoute(GuessWhoPage);
const ProtectedQuestionCard = protectRoute(QuestionCard);
// const ProtectedProfileCard = protectRoute(ProfileCard);

function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <Route path="/guesswho" component={ProtectedGuessWhoPage} />
      <Route path="/questions" component={ProtectedQuestionCard} />
      {/* <Route path="/profile" component={ProtectedProfileCard} /> */}
    </div>
  );
}

export default App;
