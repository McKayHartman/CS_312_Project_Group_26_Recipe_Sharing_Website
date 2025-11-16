// Page where users can create a new recipe

import React, { useState } from "react"
import axios from "axios"

export default function CreateRecipe() {
	const [title, setTitle] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [instructions, setInstructions] = useState("");
	const [cookTime, setCookTime] = useState("");

	const recipe = {
		title,
		ingredients,
		instructions,
		cookTime
	}

	async function handleSubmit(e) {
		e.preventDefault();
			try {
				const response = await axios.post('api/recipes', recipe)
			} catch (error) {
				console.error("Error creating recipe:", error);
			}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Create a New Recipe</h1>
			
		</form>
	)
}