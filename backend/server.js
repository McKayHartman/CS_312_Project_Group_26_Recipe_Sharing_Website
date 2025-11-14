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

// POST routes
app.post('/recipes', async (req, res) => {
  try {
    const { user_id, title, description, instructions, servings, prep_minutes } = req.body;

    const result = await pool.query(
      `INSERT INTO recipes (user_id, title, description, instructions, servings, prep_minutes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title, description, instructions, servings, prep_minutes]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting recipe into db:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE routes
// delete all recipes - for test only
app.delete('/recipes', async (req, res) => {
  try {
	await pool.query('DELETE FROM recipes');
	res.json({ message: 'All recipes deleted' });
  } catch (error) {
	console.error('Error deleting recipes from db:', error);
	res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Account creation routes

app.post('/create-account', async (req, res) => {
	const { name, email, password, matching_password } = req.body;
	// two forms - password and repeated password to make sure they match
	if (password !== matching_password) {
		console.log("Passwords do not match.");
		return res.status(400).json({ error: 'Passwords do not match' });
	}

	try {
		const result = await pool.query(
			"INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
			[name, email, password]
		);
		res.json(result.rows[0]);
		console.log("Account created successfully");
	} catch (error) {
		console.log("Unable to create account");
		res.status(500).json({ error: 'Internal Server Error' });
	}
});








// Authentication routes
app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query(
			"SELECT * FROM users WHERE email = $1 AND password = $2", [email, password]
		);

		if (result.rows.length === 0) {
			console.log("No matching email and password");
			return res.status(401).json({ error: 'Invalid email or password' });
		} else {
			console.log("User exists");
			return res.json(result.rows[0]);
		}

	} catch (error) {
		console.error("Error on login post route", error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});




//////////////////////////////////////////////////







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
