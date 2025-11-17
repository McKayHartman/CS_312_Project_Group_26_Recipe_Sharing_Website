// This file is to create context for the website to track which user is logged in
// so that it can provide the account's posts and information.
//
// Dependencies: createContext, useEffect, useState

// This UserProvider is a component that wraps the app, so that the entire app
// has access to the loggedInUser state

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(); // essentially a global useState object

export const UserProvider = ({ children }) => { 
	const [loggedInUser, setLoggedInUser] = useState(() => {
		return localStorage.getItem("user_id") || null; // checks local storage for anything for useState
	});

	// this runs every time loggedInUser changes
	useEffect(() => {
		if (loggedInUser) {
			localStorage.setItem("user_id", loggedInUser);
		} else {
			localStorage.removeItem("user_id");
		}
	}, [loggedInUser]);


	// This makes the context availible to all child components (the app component)
	return (
		<UserContext.Provider value={{ loggedInUser, setLoggedInUser}}>
			{children}
		</UserContext.Provider>
	)
}