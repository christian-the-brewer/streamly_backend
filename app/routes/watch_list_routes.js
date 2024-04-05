import express from "express";
import {db} from "../../db.js";
import jwt from "jsonwebtoken";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.put("/watch_list", async (req, res) => {
    try {
        //TODO check access token
        //insert movie or show to user watchlist record
        const {userId, contentId, contentPoster, contentType} = req.body;
        const content = `${contentId} ${contentPoster}`;
        if (contentType === "movie") {
            const addMovie = await db.query(
                "UPDATE watch_lists SET movies = ARRAY_APPEND(movies, $1) WHERE user_id = $2", [content, userId]);
            res.status(200).json({message: `added movie ${contentId} to watchList`})
        } else {
            const addShow = await db.query(
                "UPDATE watch_lists SET shows = ARRAY_APPEND(shows, $1) WHERE user_id = $2", [content, userId]);
            res.status(200).json({message: `added movie ${contentId} to watchList`})
        }
        } catch (err) {
        console.error(err.message);
    }
})

router.patch("/watch_list", async (req, res) => {
    try {
        //TODO check access token

        //remove movie or show from user watchlist record
        const {userId, contentId, contentType, contentPoster} = req.body;
        const content = `${contentId} ${contentPoster}`;
        console.log("/watchlist, ", content)
        if (contentType === "movie") {
        const removeMovie = await db.query(
            "UPDATE watch_lists SET movies = ARRAY_REMOVE(movies, $1) WHERE user_id = $2", [content, userId]);
        res.status(200).json({message: `removed movie ${contentId} watchList`}) }
        else {
            const removeShow = await db.query(
                "UPDATE watch_lists SET shows = ARRAY_REMOVE(shows, $1) WHERE user_id = $2", [content, userId]);
            res.status(200).json({message: `removed movie ${contentId} watchList`})
        }
    } catch (err) {
        console.error(err.message);
    }
})

router.get("/watch_list/:id", async (req, res) => {
    try {
        //TODO check access token

        //get users watchlist
        const userId = req.params.id;
        console.log("userId in watchlist route: ",userId)
        const watchList = await db.query(
            "SELECT movies, shows FROM watch_lists WHERE user_id = $1", [userId]);
        if (!watchList.rows[0].movies) {
            watchList.rows[0].movies = ["Add some movies to your Watch List!"]
        }
        if (!watchList.rows[0].shows) {
            watchList.rows[0].shows = ["Add some shows to your Watch List!"]
        }
        res.status(200).json({content: watchList.rows[0]});
    } catch (err) {
        console.error(err.message);
    }
})

export default router;