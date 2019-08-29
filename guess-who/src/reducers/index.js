import {
    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_TWEETS_START,
    GET_TWEETS_SUCCESS,
    GET_TWEETS_FAILURE,
    HIGHEST_SCORE,
    USER_ID,
    POST_SCORE_START,
    POST_SCORE_SUCCESS,
    POST_SCORE_FAILURE,
    RESTART_GAME,
    CORRECT_GUESS,
    INCORRECT_GUESS
} from '../actions';

export const initialState = {
    username: '',
    token: '',
    userId: '',
    tweet: '',
    tweeters: [],
    answer: {},
    signUp: false,
    loggingIn: false,
    gettingTwitter: false,
    postingScore: false,
    error: '',
    highScore: 0,
    personalHighScore: 0,
    lives: 3,
    numberOfGuesses: 0
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case SIGNUP_START:
            return {
                ...state,
                signingUp: true,
                error: ''
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                signingUp: false,
                error: '',
                token: action.payload.token
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                signingUp: false,
                error: action.payload
            }
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
                error: ''
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                error: '',
                token: action.payload.token,
                username: action.payload.username,
                userId: action.payload.userId
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                error: action.payload
            }
        case GET_TWEETS_START:
            return {
                ...state,
                gettingTwitter: true,
                error: '',
                tweet: '',
                tweeters: [],
                answer: ''
            }
        case GET_TWEETS_SUCCESS:
            return {
                ...state,
                gettingTwitter: false,
                error: '',
                tweet: action.payload.question,
                tweeters: action.payload.candidates,
                answer: action.payload.answer
            }
        case GET_TWEETS_FAILURE:
            return {
                ...state,
                gettingTwitter: false,
                error: action.payload
            }
        case HIGHEST_SCORE:
            return {
                ...state,
                personalHighScore: action.payload
            }
        case POST_SCORE_START:
            return {
                ...state,
                postingScore: true,
                error: ''
            }
        case POST_SCORE_SUCCESS:
            return {
                ...state,
                postingScore: false,
                error: ''
            }
        case POST_SCORE_FAILURE:
            return {
                ...state,
                postingScore: false,
                error: action.payload
            }
        case USER_ID:
            console.log(action.payload);
            return {
                ...state,
                userId: action.payload
            }
        
        case RESTART_GAME:
            return {
                ...state,
                lives: 3,
                numberOfGuesses: state.numberOfGuesses + 1,
                highScore: 0
            }
        
        case CORRECT_GUESS:
            return {
                ...state,
                lives: Math.min(state.lives + 1, 3),
                highScore: state.highScore + 1,
                numberOfGuesses: state.numberOfGuesses + 1
            }
        
        case INCORRECT_GUESS:
            return {
                ...state,
                lives: Math.max(state.lives - 1, 0),
                numberOfGuesses: state.numberOfGuesses + 1
            }           
    }
}
