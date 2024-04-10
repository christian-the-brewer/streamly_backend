import express from "express";
import {db} from "../../db.js";
import bcrypt from "bcrypt";


const saltRounds = 10;
const router = express.Router();

//patch user password
router.patch("/admin", async (req, res) => {
    try {
        const {userId, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        if (!userId || !password) {
            return res.status(400);
        }
        //update user record in db
        const userPasswordUpdate = await db.query(
            "UPDATE users SET hashed_password = $1 WHERE user_id = $2", [hashedPassword, userId]);
        res.status(201)
    } catch (err) {
        console.error(err)
    }
});

router.delete("/admin", async (req, res) => {
    const {userId} = req.body;
    try {
        //delete users watchlist
        console.log("deleting user ", userId);
        const deletedList = await db.query(
            "DELETE FROM watch_lists WHERE user_id = $1 RETURNING *", [userId]);
        console.log(`user ${userId} watchlist deleted`)
        res.status(200);
    } catch (err) {
        console.error(err.message);
    }
    //delete user record
    try {
        const deletedUser = await db.query(
            "DELETE FROM users WHERE user_id = $1 RETURNING *", [userId]);
        console.log(`user ${userId} deleted`);
        res.status(200);
    } catch (err) {
        console.error(err.message);
    }
});

export default router;