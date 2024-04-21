//process.env.DEBUG = "socket.io:*";
//process.env.DEBUG = "*";

import express from "express";

import { createServer } from "http";
import cookieParser from "cookie-parser";
import createDinamicServer from "./realTime";
import router from "./router";
import path from "path";

const app = express();
const httpServer = createServer(app);

app.use(cookieParser());
// where you have a html file
app.set("views", path.join(__dirname, "views"));

app.use(router);

// Public where you have a public folder
app.use(express.static(path.join(__dirname, "../public")));

export default httpServer.listen(3000); // Listen on port 3000 for used socket.io

createDinamicServer(httpServer);
