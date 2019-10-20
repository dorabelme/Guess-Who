import { axiosWithAuth } from "../utils/axiosWithAuth";

const LOGIN_BACKEND_POINT =
  "https://lambda-guess-who-app.herokuapp.com/api/auth/login";
const SIGNUP_BACKEND_POINT =
  "https://lambda-guess-who-app.herokuapp.com/api/auth/register";
const TWITTER_BACKEND_POINT =
  "https://lambda-guess-who-app.herokuapp.com/api/question";

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const GET_TWEETS_START = "GET_TWITTER_START";
export const GET_TWEETS_SUCCESS = "GET_TWITTER_SUCCESS";
export const GET_TWEETS_FAILURE = "GET_TWITTER_FAILURE";

export const HIGHEST_SCORE = "HIGH_SCORE";
export const USER_ID = "USER_ID";

export const POST_SCORE_START = "POST_SCORE_START";
export const POST_SCORE_SUCCESS = "POST_SCORE_SUCCESS";
export const POST_SCORE_FAILURE = "POST_SCORE_FAILURE";

export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const RESTART_GAME = "RESTART_GAME";
export const CORRECT_GUESS = "CORRECT_GUESS";
export const INCORRECT_GUESS = "INCORRECT_GUESS";

// function to parse token and get id
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const signup = user => dispatch => {
  dispatch({ type: SIGNUP_START });
  return axiosWithAuth()
    .post(SIGNUP_BACKEND_POINT, user)
    .then(res => {
      console.log("response ", res);
      let usernameData = JSON.parse(res.config.data).username;
      let tokenData = parseJwt(res.data.token);
      console.log(tokenData);
      localStorage.setItem("username", usernameData);
      localStorage.setItem("userId", tokenData.user.id);
      dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
      return true;
    })
    .catch(err => {
      console.log("err: ", err);
      dispatch({ type: SIGNUP_FAILURE, payload: err });
    });
};

export const login = user => dispatch => {
  dispatch({ type: LOGIN_START });
  return axiosWithAuth()
    .post(LOGIN_BACKEND_POINT, user)
    .then(res => {
      console.log("data from login:", res.config);
      localStorage.setItem("token", res.data.token);
      console.log("username", JSON.parse(res.config.data).username);
      let usernameData = JSON.parse(res.config.data).username;
      let tokenData = parseJwt(res.data.token);
      console.log(tokenData);
      localStorage.setItem("username", usernameData);
      localStorage.setItem("userId", tokenData.user.id);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: res.data.token,
          username: usernameData,
          userId: tokenData.user.id
        }
      });
      return true;
    })
    .catch(err => {
      console.log("err: ", err);
      dispatch({
        type: LOGIN_FAILURE,
        payload: "username or password is incorrect."
      });
    });
};

export const getTweets = () => dispatch => {
  dispatch({ type: GET_TWEETS_START });
  return axiosWithAuth()
    .get(TWITTER_BACKEND_POINT)
    .then(res => {
      console.log(res);
      dispatch({ type: GET_TWEETS_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: GET_TWEETS_FAILURE, payload: err });
      throw err
    });
};

export const setNewHighScore = newHighScore => dispatch => {
  dispatch({ type: HIGHEST_SCORE, payload: newHighScore });
};

export const getUserId = pToken => dispatch => {
  console.log("action pToken: ", pToken);
  dispatch({ type: USER_ID, payload: pToken });
};

export const postScore = (id, highScore) => dispatch => {
  dispatch({ type: POST_SCORE_START });
  return axiosWithAuth()
    .put(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${id}`, {
      highscore: highScore
    })
    .then(res => {
      console.log(res);
      dispatch({ type: HIGHEST_SCORE, payload: highScore });

      // dispatch({ type: POST_SCORE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      // dispatch({ type: POST_SCORE_FAILURE, payload: err })
    });
};

export const getUser = id => dispatch => {
  dispatch({ type: GET_USER_START });
  return axiosWithAuth()
    .get(`https://lambda-guess-who.herokuapp.com/api/user/${id}`)
    .then(res => {
      console.log("getUser res: ", res);
    })
    .catch(err => {
      console.log(err);
    });
};

export const restartGame = () => dispatch => {
  dispatch({ type: RESTART_GAME });
};

export const correctGuess = () => dispatch => {
  dispatch({ type: CORRECT_GUESS });
};

export const incorrectGuess = () => dispatch => {
  dispatch({ type: INCORRECT_GUESS });
};

export const setPersonalHighScore = () => dispatch => {
  dispatch({ type: INCORRECT_GUESS });
};

export const getPersonalHighScore = userId => dispatch => {
  return axiosWithAuth()
    .get(`https://lambda-guess-who.herokuapp.com/api/user/highscore/${userId}`)
    .then(res => {
      dispatch({ type: HIGHEST_SCORE, payload: res.data });
    })
    .catch(err => console.log(err.response));
};
