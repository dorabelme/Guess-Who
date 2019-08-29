import React from "react";
import { Card, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import NavbarMain from "../Navbar/Navbar2";
import "../Navbar/navbarTwo.scss";
import { Route, NavLink } from "react-router-dom";
import "./Profile.scss";
import NavbarFour from "../Navbar/Navbar4";
import ProgressBar from "./ProgressBar";

//Dummy Data before state is able to be passed from login
const profile = {
  avatar:
    "https://res.cloudinary.com/teepublic/image/private/s--ZYZlVJyo--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_000000,e_outline:48/co_000000,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_jpg,h_630,q_90,w_630/v1446179179/production/designs/106808_0.jpg",
  header: "My Profile: ",
  description: "I want to tweet the very best. "
};
export default function ProfileCard({ username, highScore }) {
  // const [avatar, getAvatar] = useState({})

  const newScores = highScore;

  return (
    <>
      <NavbarFour />

      <div className="profile-card">
        <Card>
          <Image src={profile.avatar} />
          <Card.Content>
            <Card.Header>
              <h1 className="userName">{username}</h1>
            </Card.Header>
            {/* <h2>{profile.header}</h2> */}
            <ProgressBar percentage={newScores} />
            <div class="container">
              <div className="skills scores" />
            </div>
            <h3>{10 - newScores} points till the next level</h3>
            <h2>{newScores} Tweety Points</h2>
            <h3>Bio: {profile.description}</h3>
            {/*profile.settings*/}
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
