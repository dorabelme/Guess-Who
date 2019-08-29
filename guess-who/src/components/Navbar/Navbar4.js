import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import "./navbarTwo.scss";
import "./navbarFour.scss";
import { Accordion, Icon } from 'semantic-ui-react';


function NavbarFour(props) {
    const [activeIndex, setActiveIndex] = useState(0);

    const [openModal, setOpen] = useState(false)
    const show = () => setOpen(true);
    const close = () => setOpen(false);

    const handleClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
        setOpen(!openModal);
    }

    const signOut = () => {
        localStorage.removeItem('token')
    }

    return (
        <div className="navbar">
            <div className="leftNavbar">
                <img src="./birdLogo.jpeg" alt="logo" />
                <Link to="/guesswho"><h1>Home</h1></Link>
            </div>
            <div className="sideNavBar">
                {/* <NavBar /> */}
                <Accordion>
                    <div className="sideNavButtons">
                        <Accordion.Title active={openModal} index={0} onClick={handleClick}>
                            <Icon name="dropdown" size="big" />
                            {/* {props.username} */}
                            {localStorage.getItem("username")}
                        </Accordion.Title>
                        <Accordion.Content active={openModal} className="profileCard">
                            <div>{console.log("this is user", props.username)}</div>
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
    )
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
    {}
)(NavbarFour);

