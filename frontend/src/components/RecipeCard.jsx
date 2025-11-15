// Recipe card is the default display component for individual recipes
import React from 'react'
import './RecipeCard.css'

export default function RecipeCard({ recipe }) {
	return (
		<div className="recipe-card">
			<h2>{recipe.title}</h2>
			<p>{recipe.description}</p>
			<p>Servings: {recipe.servings}</p>
			<p>Prep Time: {recipe.prep_minutes} minutes</p>
			<h3>Instructions:</h3>
			<p>{recipe.instructions}</p>
		</div>
	)
}