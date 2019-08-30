import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import "./navbar.scss";
import "./navbarTwo.scss";
import { Accordion, Icon } from "semantic-ui-react";

function NavbarTwo(props) {
    const [activeIndex, setActiveIndex] = useState(0);

  const [openModal, setOpen] = useState(false);
  const show = () => setOpen(true);
  const close = () => setOpen(false);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
    setOpen(!openModal);
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <div className="navbar">
      <div className="leftNavbar">
        <img src="./birdLogo.jpeg" alt="logo" />
        <h1>Guess Who?</h1>
      </div>
      <div className="sideNavBar">
        {/* <NavBar /> */}
        <Accordion>
          <div className="sideNavButtons">
            <Accordion.Title active={openModal} index={0} onClick={handleClick}>
              <Icon name="dropdown" size="big" />
              {localStorage.getItem("username")}
            </Accordion.Title>
            <Accordion.Content active={openModal} className="profileCard">
              <div>
                {console.log("this is user", localStorage.getItem("username"))}
              </div>
              <Link to="/profile">
                <div className="editProfileBtn" onClick={show}>
                  Profile
                </div>
              </Link>
              <Link onClick={signOut}>Sign Out</Link>
            </Accordion.Content>
          </div>
        </Accordion>
      </div>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    tweet: state.tweet,
    tweeters: state.tweeters,
    highScore: state.highScore,
    userId: state.userId,
    token: state.token,
    personalHighScore: state.personalHighScore
  };
};

export default connect(
    mapStateToProps,
    {}
)(NavbarTwo);
