import express from "express";
import {db} from "../../db.js";
import bcrypt from "bcrypt";

const saltRounds = 10;
const router = express.Router();

//register new user route
router.post("/register", async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (!email || !password) return res.status(400);
        const newUser = await db.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username, email, hashedPassword])
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//login in user route
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await db.query(
            "SELECT * FROM users WHERE email = $1", [email]
        )
        if (user.rowCount !== 0) {
            const match = await bcrypt.compare(password, user.rows[0].password);
            if (match) {
                res.status(201).json({success: "user logged in"})
            } else res.status(401).json({message: "Invalid"})
        }
        else {
            res.status(401).json({message: "Invalid"})
        }
    } catch (err) {
        console.error(err.message);
    }
});

export default router;