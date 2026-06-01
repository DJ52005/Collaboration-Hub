const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const requestRoutes = require("./routes/requestRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/hackathons",hackathonRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {

  console.log("User Connected");


  // JOIN PROJECT ROOM
  socket.on("join_project", (projectId) => {

    socket.join(projectId);

  });


  // SEND MESSAGE
  socket.on("send_message", async (data) => {

    io.to(data.projectId).emit(
      "receive_message",
      data
    );

  });


  socket.on("disconnect", () => {

    console.log("User Disconnected");

  });

});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const onlineUsers = new Map();

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);


  /*
  =====================================
  USER ONLINE
  =====================================
  */

  socket.on("user_online", (userId) => {

    onlineUsers.set(userId, socket.id);

    io.emit(
      "online_users",
      Array.from(onlineUsers.keys())
    );

  });


  /*
  =====================================
  JOIN CONVERSATION
  =====================================
  */

  socket.on(
    "join_conversation",
    (conversationId) => {

      socket.join(conversationId);

      console.log(
        `Joined Conversation ${conversationId}`
      );

    }
  );


  /*
  =====================================
  SEND MESSAGE
  =====================================
  */

  socket.on(
    "send_message",
    (data) => {

      io.to(
        data.conversationId
      ).emit(
        "receive_message",
        data
      );

    }
  );


  /*
  =====================================
  TYPING
  =====================================
  */

  socket.on(
    "typing",
    (data) => {

      socket.to(
        data.conversationId
      ).emit(
        "typing",
        data
      );

    }
  );


  /*
  =====================================
  STOP TYPING
  =====================================
  */

  socket.on(
    "stop_typing",
    (conversationId) => {

      socket.to(
        conversationId
      ).emit(
        "stop_typing"
      );

    }
  );


  /*
  =====================================
  DISCONNECT
  =====================================
  */

  socket.on("disconnect", () => {

    for (const [
      userId,
      socketId,
    ] of onlineUsers.entries()) {

      if (socketId === socket.id) {

        onlineUsers.delete(userId);

        break;
      }
    }

    io.emit(
      "online_users",
      Array.from(onlineUsers.keys())
    );

    console.log("User Disconnected");

  });

});