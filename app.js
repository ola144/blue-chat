const express = require("express");
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger");

const app = express();
const authRoute = require("./Routes/authRoute");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const msgRoute = require("./Routes/messageRoute");

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4200",
  "https://blue-chat-ui.vercel.app",
  "https://blue-chat-wryt.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no Origin (Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      // Allow any localhost port
      if (
        allowedOrigins.includes(origin) ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(cors(/* options */));

app.use(
  express.json({
    limit: "50mb",
  }),
);

// Websocket
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: (origin, callback) => {
      // Allow requests with no Origin (Postman, mobile apps, curl)
      if (!origin) return callback(null, true);

      // Allow any localhost port
      if (
        allowedOrigins.includes(origin) ||
        /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  },
});

// use route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/message", msgRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/api-docs.json", (req, res) => {
  res.json(specs);
});

let onlineUsers = [];

// TEXT SOCKET CONNECTION FROM CLIENT
io.on("connection", (socket) => {
  // console.log("Conected with socket ID: " + socket.id);
  // socket.on("send-message-all", (data) => {
  // console.log(data);
  // Emit another event to send the data to all the clients
  // socket.emit("send-message-by-server", "Message from server: " + data.text);
  // });

  socket.on("join-room", (userId) => {
    socket.join(userId);
  });

  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);
  });

  socket.on("clear-unread-message", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("message-count-cleared", data);
  });

  socket.on("user-typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });

  socket.on("user-login", (userId) => {
    if (!onlineUsers.includes(userId)) {
      onlineUsers.push({
        userId: userId,
        socketId: socket.id,
      });
    }

    io.emit("online-users", onlineUsers);
  });

  socket.on("disconnect", (userId) => {
    // onlineUsers.splice(onlineUsers.indexOf(userId), 1);
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("offline-users", onlineUsers);
  });

  // socket.on("user-offline", (userId) => {
  //   onlineUsers.splice(onlineUsers.indexOf(userId), 1);
  //   onlineUsers = onlineUsers.filter((user) => user.userId !== userId);

  //   io.emit("online-users-updated", onlineUsers);
  // });
});

module.exports = server;
