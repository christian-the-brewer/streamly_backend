import express from "express";
import {watchProviders} from "../watch_providers.js";
import {fetchPopularTV, fetchTVById} from "../api.js";

const router = express.Router();

//api calls

//index routes

//Get /tv
router.get("/tv/:region", (req, res, next)=>{
    //fetch top 20 shows from api
    fetchPopularTV(req.params.region)
        .then((shows) => {
            res.status(201).json({shows: shows.data.results})
        }).catch(next);
})

//get single show
router.get("/tv/show/:id", (req, res, next) => {
    //fetch details about movie
    fetchTVById(req.params.id)
        .then((show) => {
            res.status(201).json({show: show.data})
        }).catch(next);

});

export default router