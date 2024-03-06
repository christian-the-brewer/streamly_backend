import express from "express";
import passport from "passport";
import { fetchPopularMovies, fetchMovieById } from "../api.js"

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

router.get("/movie/:id", (req, res, next)=> {
    //api call to fetch movie data by id
    fetchMovieById(req.params.id)
        .then((movie)=> {
            res.status(201).json({movie: movie.data})
        }) .catch(next)
})

export default router