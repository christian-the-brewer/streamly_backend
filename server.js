import express from "express";
import cors from "cors";
import Client from "pg"
import movie_routes from "./app/routes/movie_routes.js";
import shared_routes from "./app/routes/shared_routes.js"
import tv_routes from "./app/routes/tv_routes.js"
import person_routes from "./app/routes/person_routes.js";
import "dotenv/config"
import {fetchWatchProviders} from "./app/api.js";


const app = express();
const PORT = process.env.PORT || 3001;

//Database
const db = new Client({
    user: "username",
    host: "localhost",
    database: "streamlyDB",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

db.connect();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(movie_routes)
app.use(shared_routes)
app.use(tv_routes)
app.use(person_routes)

app.listen(PORT, () => {
    console.log(`server online on ${PORT}`)
});