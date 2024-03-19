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

