import { Link } from 'react-router-dom'


export default function Home() {
	return (
		<div>
			<h1>Home page</h1>
			<Link to="/recipes">Go to Recipes</Link>
			<Link to="/login">Go to Login</Link>
			<Link to="/create-account">Go to Create Account</Link>
		</div>
	)
}