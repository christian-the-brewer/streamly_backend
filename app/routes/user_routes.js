import express from "express";
import {db} from "../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const saltRounds = 10;
const router = express.Router();

//register new user route
router.post("/register", async (req, res, next) => {
    try {
        //take credentials from request and add to database
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (!email || !password) return res.status(400);
        //check if email is already registered in db
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        //if the query returns a user record then return message and status saying so and urge user to sign in
        if (user.rowCount === 1) {
            res.status(409).json({message: "Email already in use, sign in!"})
        } else {
            //add new user into db
            const newUser = await db.query(
                "INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *", [email, hashedPassword]);
            //create a watch list for this user in the db
            const watchList = await db.query(
                "INSERT INTO watch_lists (user_id) VALUES ($1) RETURNING *", [newUser.rows[0].user_id]);
            res.status(201).json(newUser.rows[0]);
        }
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
        if (user.rowCount === 1) {
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
                res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
                res.status(201).json({accessToken});
            } else res.status(401).json({message: "Invalid"})
        } else {
            res.status(401).json({message: "Invalid"})
        }
    } catch (err) {
        console.error(err.message);
    }
});

export default router;