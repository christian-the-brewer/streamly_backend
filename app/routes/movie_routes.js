import express from "express";
import passport from "passport";
import {fetchPopularMovies, fetchMovieById, fetchPopularMoviesByPlatform} from "../api.js"
import {watchProviders} from "../watch_providers.js";

const router = express.Router();

//api calls
//Index routes

//Get /movies

router.get('/movies/:region', (req, res, next) => {
    //fetch top 20 most popular movies from API
    fetchPopularMovies(req.params.region)
        .then((movies) => {
            res.status(201).json({ movies: movies.data.results })

        })
        .catch(next)
})

//Get movies by platform
router.get("/movies/:region/:id", (req, res, next) => {
    //fetch top 20 movies by platform
    const platformID = watchProviders[req.params.id]
    fetchPopularMoviesByPlatform(req.params.region, platformID)
        .then((movies)=> res.status(201).json({movies: movies.data.results}))
        .catch(next)
});

//Show route
router.get("/movie/:id", (req, res, next)=> {
    //api call to fetch movie data by id
    fetchMovieById(req.params.id)
        .then((movie)=> {
            res.status(201).json({movie: movie.data})
        }) .catch(next)
})

export default router