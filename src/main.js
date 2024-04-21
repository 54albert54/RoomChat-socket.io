"use strict";
//process.env.DEBUG = "socket.io:*";
//process.env.DEBUG = "*";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const realTime_1 = __importDefault(require("./realTime"));
const router_1 = __importDefault(require("./router"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cookie_parser_1.default)());
// where you have a html file
app.set("views", path_1.default.join(__dirname, "views"));
app.use(router_1.default);
// Public where you have a public folder
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
exports.default = httpServer.listen(3000); // Listen on port 3000 for used socket.io
(0, realTime_1.default)(httpServer);
