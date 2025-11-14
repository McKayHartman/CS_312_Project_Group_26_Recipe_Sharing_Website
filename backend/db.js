// db.js
import { Pool } from 'pg';

// Create a PostgreSQL pool
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RecipeDB',
  password: '1234',
  port: 5432, // this is PostgreSQL's port
});
