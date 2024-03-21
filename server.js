import express from "express";
import cors from "cors";
import movie_routes from "./app/routes/movie_routes.js";
import shared_routes from "./app/routes/shared_routes.js"
import tv_routes from "./app/routes/tv_routes.js"
import person_routes from "./app/routes/person_routes.js";
import user_routes from "./app/routes/user_routes.js";
import "dotenv/config"
import verifyJWT from "./app/middleware/verifyJWT.js";


const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use(movie_routes)
app.use(shared_routes)
app.use(tv_routes)
app.use(person_routes);
app.use(user_routes)

app.listen(PORT, () => {
    console.log(`server online on ${PORT}`)
});