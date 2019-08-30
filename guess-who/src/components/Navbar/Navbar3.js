import React from "react";
import { Link } from "react-router-dom";
import "./navbarThree.scss";

function NavbarThree({ highScore, lives }) {
  return (
    <div className="navbarAll">
      <div className="leftNavbar">
        <img src="./birdLogo.jpeg" alt="logo" />
        <Link to="guesswho" className="home-button">
          Home
        </Link>
      </div>
      <div>{/* <h1 className="score">Score: {highScore}</h1> */}</div>
      <div className="rightNavbar">
        {Array.from(Array(lives).keys())
          .map(i => i + 1)
          .map(id => (
            <img key={id} src="./heart.png" className="heart" id={id}></img>
          ))}
      </div>
    </div>
  );
}

export default NavbarThree;
