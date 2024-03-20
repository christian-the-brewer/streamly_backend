import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401);
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403);
            req.email = decoded.email;
            next();
        }
    );
};