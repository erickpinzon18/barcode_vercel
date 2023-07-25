import express, { urlencoded } from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

import routes from "./routes/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const httpServer = http.createServer(app);
const io = new Server(httpServer);

dotenv.config();

httpServer.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION, 
        resave: false, 
        saveUninitialized: true, // true: permite que se guarde la cookie en el navegador
        cookie: { maxAge: 3600000 }, // 1 hour
    })
);

app.use("/", routes);
app.use("/js", express.static(join(__dirname, "src/js")));
app.use("/libs", express.static(join(__dirname, "src/libs")));
app.use("/config", express.static(join(__dirname, "./config")));

app.set("view engine", "ejs");
