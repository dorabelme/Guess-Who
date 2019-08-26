import React, {useState, useEffect} from "react";
import axios from "axios";

const QuestionCard = props => {

    //State for the text from the tweet
    const [tweet, setTweet] = useState("tweet here");

    //State for the 3 candidates on the card
    const [candidates, setCandidates] = useState({});

    //Category array that includes each question card
    // const [category, setCategory] = useState([]);

    useEffect(() => {
        //Axios.get statement
        axios.get("https://lambda-guess-who.herokuapp.com/api/question")
            .then(res => {
                setTweet(res.data.question);
                setCandidates(res.data.candidates);
                console.log(res);
            })
            .catch(err => console.log(err.response));
    }, []);

    return (
        <div className="question-card">
            <p>{tweet}</p>
        </div>
    )
}

export default QuestionCard;