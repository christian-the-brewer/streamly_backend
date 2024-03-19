import express from "express";
import {db} from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const saltRounds = 10;
const router = express.Router();

//register new user route
router.post("/register", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (!email || !password) return res.status(400);
        const newUser = await db.query(
            "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *", [email, hashedPassword])
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

//login in user route
router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body
        const user = await db.query(
            "SELECT * FROM users WHERE email = $1", [email]
        )
        if (user.rowCount !== 0) {
            const match = await bcrypt.compare(password, user.rows[0].hashed_password);
            if (match) {
                //JWT
                const accessToken = jwt.sign(
                    {"email": user.rows[0].email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "5m"
                    }
                );
                const refreshToken = jwt.sign(
                    {"email": user.rows[0].email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {
                        expiresIn: "1d"
                    }
                );
                const giveToken = await db.query(
                    "UPDATE users SET refresh_token = $1 WHERE email = $2", [refreshToken, email]
                )
                res.status(201).json({success: "user logged in"})
            } else res.status(401).json({message: "Invalid"})
        } else {
            res.status(401).json({message: "Invalid"})
        }
    } catch (err) {
        console.error(err.message);
    }
});

export default router;