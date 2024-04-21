import { Router } from "express";
import express from "express";
import path from "path";
import checkCookie from "../middleware/checkCookie";
// import createDinamicServer from "../realTime";
// import httpServer from "../main";

const app = express();

const router = Router();

const view = path.join(__dirname, "../view/");

//, "../view/."
//app.use(express.static(path.join(__dirname + "/../view/")));

router.get("/", checkCookie, (req, res) => {
  res.sendFile(view + "index.html");
});

router.get("/register", (req, res) => {
  res.sendFile(view + "register.html");
});

export default router;
