import express from "express";
import {fetchSearchMulti} from "../api.js";

const router = express.Router()

router.get("/search/multi/:term", (req, res, next) => {
    const searchTerm = req.params.term;
    fetchSearchMulti(searchTerm)
        .then((results) => {
            res.status(201).json({results: results.data.results})
        }) .catch(next);
});

export default router