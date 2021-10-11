const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 1400;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/feeds", require("./routes/feedRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/comment", require("./routes/commentRoutes"));
app.use("/chat", require("./routes/chatRoutes"));
app.use("/followings", require("./routes/followingsRoutes"));
app.use("/notification", require("./routes/notificationRoutes"));
app.use("/channel", require("./routes/channel"));
app.use("/broadcast", require("./routes/broadcast"));
app.use("/group", require("./routes/group"));
app.use("/group_message", require("./routes/groupmessage"));

// "mongodb://127.0.0.1:27017/schway";
// process.env.MONGODB_URL
mongoose
  .connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("successfully connected to MongoDB");

    app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
  })
  .catch((err) => console.log("Error", err));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
