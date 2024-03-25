import pg from "pg";

const {Pool} = pg;

// Database
export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "StreamlyDB",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

//creates users table
// CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     email TEXT NOT NULL UNIQUE,
//     hashed_password TEXT NOT NULL,
//     created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
//     refresh_token TEXT,
//     region VARCHAR(2),
//     language VARCHAR(2)
// )

//creates watch_list table
// CREATE TABLE watch_list (
//     list_id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users,
//     movies JSON ARRAY,
//     shows JSON ARRAY
// )

