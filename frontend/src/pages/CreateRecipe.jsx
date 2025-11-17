// Page where users can create a new recipe

import React, { useState } from "react"
import axios from "axios"
import Input from "../components/Input"

export default function CreateRecipe() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [instructions, setInstructions] = useState("");
	const [servings, setServings] = useState("");
	const [prepMinutes, setPrepMinutes] = useState("");

	const [postStatus, setPostStatus] = useState(false);
	const [invalidInputStatus, setInvalidInputStatus] = useState(false);


	async function handleSubmit(e) {
		e.preventDefault();

		const recipe = {
			user_id: 1, // this needs to be updated to be supplied from user data
			title,
			description,
			instructions,
			servings: Number(servings),
			prep_minutes: Number(prepMinutes),
		};


			try {
				// check that all forms have valid input
				if(title && description && instructions && servings && prepMinutes) {

					// Post the recipe
					console.log("sending recipe: ", recipe);
					const response = await axios.post('api/recipes', recipe);
					console.log("recipe created", response.data); // Debug

					// clear inputs
					setTitle('');
					setDescription('');
					setInstructions('');
					setServings('');
					setPrepMinutes('');
					
					// Make sure that the IIS is unchecked
					setInvalidInputStatus(false);

					// Tell user that their recipe is posted
					setPostStatus(true);
				} else {
					setInvalidInputStatus(true);
				}

				
			} catch (error) {
				console.error("Error creating recipe:", error);
			}
	}

	// Return a form with inputs for the POST route to the db
	return (
		<div>
			<h1 className="font-3xl">Create Recipe Page!</h1>
			<div>
				{/* This checks to see if invalidInputStatus is true, and if so, alert the user */}
				{invalidInputStatus && <h3 class="errorMessage">Invalid Input</h3>}
				{/* Alert the user that their post went through */}
				{postStatus && <h3>Recipe Posted!</h3>}
			</div>
			<form className="space-y-4 max-w-md">
				<label>
					Recipe Title: 
					<Input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
				</label>
				<label>
					Description:
						<Input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
				</label>
				<label>
					Instructions:
					<Input type="text" value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
				</label><label>
					Servings:
					<Input type="number" value={servings} onChange={(e) => setServings(e.target.value)}/>
				</label>
				<label>
					Prep Minutes:
					<Input type="number" value={prepMinutes} onChange={(e) => setPrepMinutes(e.target.value)} placeholder="Prep time (minutes)"/>
				</label>
				<button onClick={handleSubmit} type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post Recipe</button>
				
				
			</form>
		</div>
	)
}