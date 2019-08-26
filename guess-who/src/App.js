import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";

import './App.css';
import "./App.css";
import GuessWhoPage from "./components/GuessWhoPage";


const protectRoute = Component => props => {
  if (localStorage.getItem('token')) {
    return <Component {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};

const ProtectedGuessWhoPage = protectRoute(GuessWhoPage);



function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

      <Route path="/guesswho" component={ProtectedGuessWhoPage} />
    </div>
  );
}

export default App;
