// you need to give the ID information collected in app to the modal. Make sure it gets state.
// then all you need to do is work out the logic which will allow you to on button press (try again or quit) put the new high score if it is greater than the current high score. Make sure high score is passed into the modal as well.

const putHighScore = score => {
  const url = "https://lambda-guess-who.herokuapp.com/api/user/highscore/:id ";
  if (score > highScore)
    axiosWithAuth()
      .put(url, score)
      .then(res => {
        console.log("highscore data:", res);
        localStorage.setItem("token", res.data.token);
        console.log("username", JSON.parse(res.config.data).username);
        let usernameData = JSON.parse(res.config.data).username;
        let tokenData = parseJwt(res.data.token);
        let highScoreData = JSON.parse(res.config.data).highScore;
        setState({
          ...initialState,
          username: usernameData,
          userId: tokenData.user.id,
          highScore: highScoreData
        });
        console.log(tokenData.user.id);
        props.history.push("/guesswho");
      })
      .catch(e => {
        console.log(e.response);
      });
};
