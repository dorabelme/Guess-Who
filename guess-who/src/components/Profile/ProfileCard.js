import React, {useState} from 'react';
import axios from 'axios';
const ProfileCard =props => {

	//state set for profile data
	const [profile, setProfile]= useState([]);

	//State set for profile image
	const [imageProfile, getImageProfile] = useState([]);
	//state set for username
	const [name, setName] = useState("name here");
	//state set for score
	const [score, SetScore] = useState([]);
	//state set for changing user settings
	const [settings, getSettings]= useState([]);

	

useEffect(() => {
	axios.get("https://lambda-guess-who.herokuapp.com/api/question")
	.then(response=> {
		setProfile
	}
		)
}

)


}




export default ProfileCard;