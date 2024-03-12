import express from "express";
import movie_routes from "./app/routes/movie_routes.js";
import shared_routes from "./app/routes/shared_routes.js"
import tv_routes from "./app/routes/tv_routes.js"
import "dotenv/config"
import {fetchWatchProviders} from "./app/api.js";


const app = express();
const PORT = process.env.PORT || 3001;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(movie_routes)
app.use(shared_routes)
app.use(tv_routes)

app.listen(PORT, () => {
    console.log(`server online on ${PORT}`)
});