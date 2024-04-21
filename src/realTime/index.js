"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
let allClients = [];
let allMessages = [];
function createDinamicServer(httpServer) {
    const io = new socket_io_1.Server(httpServer);
    io.use((socket, next) => {
        var _a;
        const cookieName = (_a = socket.request.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=").pop();
        if (cookieName) {
            const nameOccupied = allClients.some((client) => client.userName === cookieName);
            const isSaved = allClients.some((client) => client.id === socket.id);
            if (!isSaved && !nameOccupied) {
                allClients.push({ id: socket.id, userName: cookieName });
            }
            else if (!isSaved && nameOccupied) {
                allClients.filter((client) => client.userName != cookieName);
                allClients.push({ id: socket.id, userName: cookieName });
            }
        }
        next();
    });
    io.on("connection", (socket) => {
        // send all clients
        io.emit("all-clients", allClients);
        io.emit("add-user", allMessages);
        socket.on("send-message", (data) => {
            var _a;
            const userName = (_a = allClients.find((client) => client.id == socket.id)) === null || _a === void 0 ? void 0 : _a.userName;
            allMessages.push({ user: userName, message: data });
            io.emit("receive-message", allMessages);
        });
        socket.on("disconnect", () => {
            allClients = allClients.filter((client) => client.id !== socket.id);
            io.emit("all-clients", allClients);
        });
    });
}
exports.default = createDinamicServer;
