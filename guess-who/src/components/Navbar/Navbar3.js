import React from "react";
import { Link } from "react-router-dom";
import "./navbarThree.scss";
import { Card, Button, Label, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


function NavbarThree({ highScore, lives }) {
    return (
        <div className="navbarAll">
            <div className="leftNavbar">
                <img src="./birdLogo.jpeg" alt="logo" />
                <Link to="guesswho"><h1 href="/guesswho" className="home-button">Home</h1></Link>
            </div>
            <div>
                {/* <h1 className="score">Score: {highScore}</h1> */}
            </div>
            <div className="rightNavbar">
                {Array.from(Array(lives).keys()).map(i => i + 1).map(id => <img key={id} src="./heart.png" className="heart" id={id}></img>)}
            </div>
        </div>
    )
}

export default NavbarThree;
