import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import "./navbarTwo.scss";
import { Accordion, Icon } from "semantic-ui-react";

function NavbarMain({ username }) {
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
  };

  return (
    <div className="navbar">
      <div className="leftNavbar">
        <img src="./birdLogo.jpeg" alt="logo" />
        <h1>Guess Who?</h1>
      </div>
      {/* <img src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-coloricon/21/29-512.png" alt="hamburger menu"  /> */}
      <div className="sideNavBar">
        {/* <NavBar /> */}
        <Accordion>
          <div className="sideNavButtons">
            <Accordion.Title active={openModal} index={0} onClick={handleClick}>
              <Icon name="dropdown" size="big" />
              {username}
            </Accordion.Title>
            <Accordion.Content active={openModal} className="profileCard">
              <div>{console.log("this is user", username)}</div>
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

export default NavbarMain;
