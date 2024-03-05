import express from "express";
import movie_routes from "./app/routes/movie_routes.js";
import "dotenv/config"


const app = express();
const PORT = process.env.PORT || 3001;


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(movie_routes)

// app.get("/movies", (req, res) => {
//     res.status(200).send({
//         movie: "jaws",
//     })
// })



app.listen(PORT, () => {
    console.log(`server online on ${PORT}`)
});