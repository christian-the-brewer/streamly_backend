import express from "express";
import passport from "passport";
import { fetchPopularMovies, fetchMovieById } from "../api.js"

const router = express.Router();

//api calls
//Index routes

//Get /movies

router.get('/movies/:region', (req, res, next) => {
    //fetch top 20 most popular movies from API
    console.log("hit movies/region")
    console.log(req.params.region)
    fetchPopularMovies(req.params.region)
        .then((movies) => {
            res.status(201).json({ movies: movies.data.results })

        })
        .catch(next)
})

export default router