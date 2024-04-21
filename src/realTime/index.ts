import { Server } from "socket.io";

interface Client {
  id: string;
  userName: string;
}
interface Message {
  user: string;
  message: string;
  id: string;
}

let allClients: Client[] = [];
let allMessages: Message[] = [];

export default function createDinamicServer(httpServer: any) {
  const io = new Server(httpServer);

  io.use((socket, next) => {
    const cookieName = socket.request.headers.cookie?.split("=").pop();

    if (cookieName) {
      const nameOccupied = allClients.some(
        (client) => client.userName === cookieName
      );
      const isSaved = allClients.some((client) => client.id === socket.id);
      if (!isSaved && !nameOccupied) {
        allClients.push({ id: socket.id, userName: cookieName });
      } else if (!isSaved && nameOccupied) {
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
      const userName = allClients.find((client) => client.id == socket.id)
        ?.userName!;

      allMessages.push({ user: userName, message: data, id: socket.id });

      io.emit("receive-message", allMessages);
    });

    socket.on("disconnect", () => {
      allClients = allClients.filter((client) => client.id !== socket.id);
      io.emit("all-clients", allClients);
    });
  });
}
