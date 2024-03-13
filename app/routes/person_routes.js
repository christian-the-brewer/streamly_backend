import express from "express";
import {fetchPersonById} from "../api.js";

const router = express.Router();

//get person by id
router.get("/person/:id", (req, res, next) => {
    fetchPersonById(req.params.id)
        .then((person) => {
            res.status(201).json({person: person.data})
        }).catch(next);
});

export default router;