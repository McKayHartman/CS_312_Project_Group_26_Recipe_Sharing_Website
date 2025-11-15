import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import RecipeCard from "../components/RecipeCard"
import axios from "axios"



export default function Recipes() {
	const [recipes, setRecipes] = useState([]);

	// Gets all recipes from the DB
	async function fetchAllRecipes() {
		try {
			const response = await axios.get('/api/recipes');
			console.log(response.data);
			setRecipes(response.data);
		} catch (error) {
			console.error("Error fetching recipes:", error);
		
		}
	}

	return (
		<div>
			<h1>Recipes Page</h1>
			<button onClick={fetchAllRecipes}>Get All Recipes</button>
			{/* render ul of recipe cards here */}
			<ul>
				{recipes.map(recipe => (
					<li key={recipe.recipe_id}>
						<RecipeCard recipe={recipe} />
					</li>
				))}
			</ul>
		</div>
	)
}
