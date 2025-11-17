import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'


export default function Home() {
	const { loggedInUser } = useContext(UserContext);
	const [userName, setUserName] = useState("");

	// get the user name based on the loggedInUser id number
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await axios.get(`/api/users/${loggedInUser}`);
				setUserName(response.data.name);
			} catch (error) {
				console.error("Error fetching user info: ", error);
				setUserName("Guest");
			}
		}
		if (loggedInUser) fetchUser();
	}, [loggedInUser]);

	return (
		<div>
			<h1 className="text-3xl font-bold text-blue-700">Welcome to the Home Page!</h1>
			<p>Welcome {userName}</p>
			<Link className="text-xl font-bold hover:underline" to="/recipes">Go to Recipes</Link>
			<br />
			<Link className="text-xl font-bold hover:underline" to="/login">Go to Login</Link>
			<br />
			<Link className="text-xl font-bold hover:underline" to="/create-account">Go to Create Account</Link>
		</div>
	)
}