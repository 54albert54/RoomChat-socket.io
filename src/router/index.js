"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const checkCookie_1 = __importDefault(require("../middleware/checkCookie"));
// import createDinamicServer from "../realTime";
// import httpServer from "../main";
const app = (0, express_2.default)();
const router = (0, express_1.Router)();
const view = path_1.default.join(__dirname, "../view/");
//, "../view/."
//app.use(express.static(path.join(__dirname + "/../view/")));
router.get("/", checkCookie_1.default, (req, res) => {
    res.sendFile(view + "index.html");
});
router.get("/register", (req, res) => {
    res.sendFile(view + "register.html");
});
exports.default = router;
