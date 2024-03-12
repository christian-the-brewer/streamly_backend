import express from "express";
import {watchProviders} from "../watch_providers.js";
import {fetchPopularTV} from "../api.js";

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

export default router