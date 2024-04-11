import express from "express";
import {db} from "../../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/refresh", async (req, res) => {
    try {
        const cookies = req.cookies;
        console.log("refreshing token");
        if (!cookies?.jwt) {
            return res.sendStatus(401);
        }
        console.log("cookies: ", cookies.jwt);
        const refreshToken = cookies.jwt;
        const user = await db.query(
            "SELECT * FROM users WHERE refresh_token = $1", [refreshToken]
        );
        if (user.rowCount === 1) {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                console.log("user: ", user.rows[0].email, decoded.email)
                if (err || user.rows[0].email !== decoded.email) {
                    res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    {"email": user.rows[0].email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: "4h"}
                )
                res.json({accessToken});
            });
        } else {
            return res.sendStatus(403);
        }
    } catch (err) {
        console.error(err.message);
    }
});

router.post("logout", async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) res.status(204)
    }catch (err) {
        console.error(err.message);
    }
});

export default router;