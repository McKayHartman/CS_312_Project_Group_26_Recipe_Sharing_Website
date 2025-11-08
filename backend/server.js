// This file is the entry point for the backend server.
// Here you will find routes and middleware for handling api requests.
// You can modify the existing routes, but BE CAREFUL because some
// of them are critical to the application's functionality


// Imports
import express from 'express';
import { pool } from './db.js';
import cors from 'cors';


// Express app setup
const app = express();
const PORT = 3000; // Express server port

// Middleware
app.use(cors());
app.use(express.json());


//////////////////// ROUTES ////////////////////
app.get('/', async (req, res) => {
  res.json({ message: 'API running' });
});




// Returns all recipes from the database
app.get('/recipes', async (req, res) => {
  try {
	const result = await pool.query('SELECT * FROM recipes');
	res.json(result.rows);
  } catch (err) {
	console.error(err);
	res.status(500).send('Error fetching recipes');
  }
});

// Returns a specific recipe by ID
app.get('/recipes/:id', async (req, res) => {
	try{
		const id = parseInt(req.params.id);

		// Look through the database for row with corresponding id
		const result = await pool.query('SELECT * FROM recipes WHERE recipe_id = $1', [id]);
		// if no results found throw error code 404
		if (!result.rows[0]) {
			return res.status(404).json({ error: 'Recipe with requested id not found'});
		}
		// return the found rows
		res.json(result.rows[0]);
	} catch (error) {
		console.error('Error fetching recipe from db:', error);
		res.status(500).json({error: 'Internal Server Error'});
	}
});

//////////////////////////////////////////////////







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
