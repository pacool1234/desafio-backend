const express = require("express");
const http = require("http");
const socketIo = require('socket.io');
const cors = require("cors");
const { dbConnection } = require("./config/config");
const swaggerUI = require('swagger-ui-express') //SWAGGER
const docs = require('./docs/index') //SWAGGER
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs)) //SWAGGER Api doc route

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
      origin: ["http://localhost:5173", "https://tripulaciones-frontend-fork-1.vercel.app"], // replace with your client's origin 
      methods: ["GET", "POST"],
      credentials: true
  }
});

app.use(express.json());
app.use(express.static("./uploads")) //Necessary to get correct url in frontend


app.use("/users", require("./routes/users"));
app.use("/userTypes", require("./routes/userTypes"));
app.use("/degrees", require("./routes/degrees"));
app.use("/chats", require("./routes/chats"));
app.use("/events", require("./routes/events"));
app.use("/tags", require("./routes/tags"));
app.use("/notifications", require("./routes/notifications"));
app.use("/notices", require("./routes/notices"));
app.use("/comments", require("./routes/comments"));
app.use("/skills", require("./routes/skills"));
app.use("/hobbies", require("./routes/hobbies"));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("chat update", ({ chatId }) => {
    socket.broadcast.emit("chat update");
    console.log("EMITTED!");
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

dbConnection();

server.listen(PORT, () => 
  console.log(`Server started on port ${PORT} with cors() enabled`)
);
