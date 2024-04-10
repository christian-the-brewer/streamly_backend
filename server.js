import express from "express";
import cors from "cors";
import movie_routes from "./app/routes/movie_routes.js";
import shared_routes from "./app/routes/shared_routes.js"
import tv_routes from "./app/routes/tv_routes.js"
import person_routes from "./app/routes/person_routes.js";
import user_routes from "./app/routes/user_routes.js";
import "dotenv/config"
import verifyJWT from "./app/middleware/verifyJWT.js";
import watch_list_routes from "./app/routes/watch_list_routes.js";
import admin_routes from "./app/routes/admin_routes.js";
import cookieParser from "cookie-parser";
import refresh_routes from "./app/routes/refresh_routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

const whiteList = [
    "https://localhost:5173",
    "http://localhost:5173"
]
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
}

//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use(movie_routes);
app.use(shared_routes);
app.use(tv_routes);
app.use(person_routes);
app.use(user_routes);
app.use(refresh_routes);
app.use(verifyJWT);
app.use(watch_list_routes);
app.use(admin_routes);


app.listen(PORT, () => {
    console.log(`server online on ${PORT}`)
});