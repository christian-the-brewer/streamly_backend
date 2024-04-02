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
//     roles INTEGER ARRAY,
//     region VARCHAR(2) DEFAULT "US",
//     language VARCHAR(2) DEFAULT "EN"
// )

// creates watch_list table
// CREATE TABLE watch_lists (
//     list_id SERIAL PRIMARY KEY,
//     user_id INTEGER REFERENCES users,
//     movies TEXT ARRAY,
//     shows TEXT ARRAY
// )

