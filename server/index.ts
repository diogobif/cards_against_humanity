import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Room } from "./src/entities/models/Room";
import { Game } from "./src/entities/models/Game";
import { User } from "./src/entities/models/User";
import { GameRound } from "./src/entities/models/GameRound";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const roomList: Room[] = [];
const userList: User[] = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", (roomId: string, userId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", userId);
    console.log(`${userId} joined room ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
/*
const newRoom = new Room("1");
const newGame = new Game();
newGame.setPlayers(newRoom.getUsers());
newGame.start();
for (let i = 0; i <= 4; i++) {
  const newRound: GameRound = newGame.startNewRound();
  newGame.getPlayers().forEach((user: User) => {
    if (user.getId() !== newRound.getMainPlayer().getId()) {
      newRound.getCardFromUser(
        user,
        user.chooseCard(user.getCurrentCards()[0].getCardId())
      );
    }
  });
  const roundWinner: string = Array.from(
    newRound.getRoundWhiteCardOptionsDisplay().keys()
  )[0]!;
  newRound.defineRoundWinner(roundWinner);
}
newGame.finishGame();
*/

server.listen(PORT, () => {
  console.log(`Signaling server running on http://localhost:${PORT}`);
});
