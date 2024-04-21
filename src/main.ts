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

const port = process.env.PORT || 4000;

app.use(cookieParser());
// where you have a html file
app.set("views", path.join(__dirname, "views"));

app.use(router);

// Public where you have a public folder
app.use(express.static(path.join(__dirname, "../public")));

export default httpServer.listen(port, () =>
  console.log(`server running on port ${port}`)
); // Listen on port  for used socket.io

createDinamicServer(httpServer);
