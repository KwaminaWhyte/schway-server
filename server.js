const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 1400;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/feeds", require("./routes/feedRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/followings", require("./routes/followingsRoutes"));
app.use("/notification", require("./routes/notificationRoutes"));
app.use("/channel", require("./routes/channel"));
app.use("/broadcast", require("./routes/broadcast"));
app.use("/group", require("./routes/group"));
app.use("/group_message", require("./routes/groupmessage"));
app.use("/conversation", require("./routes/conversationRoutes"));
app.use("/message", require("./routes/message"));

io.on("connection", (socket) => {
  socket.on("chat", (msg) => {
    console.log(msg);
    io.emit("receive-chat", msg);
  });
});

// to individual socketid (private message)
// io.to(socketId).emit(/* ... */);

// to all clients in room1
// io.in("room1").emit(/* ... */);

// to all clients in the current namespace except the sender
// socket.broadcast.emit(/* ... */);

// io.on("connection", (socket) => {
//   socket.broadcast.emit("hi");
// });

// "mongodb://127.0.0.1:27017/schway";
// process.env.MONGODB_URL
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("successfully connected to MongoDB");

    server.listen(PORT, () => console.log(`server running on port: ${PORT}`));
  })
  .catch((err) => console.log("Error", err));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
