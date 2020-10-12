const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const Pusher = require("pusher");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/feeds", require("./routes/feedRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/comment", require("./routes/commentRoutes"));

const pusher = new Pusher({
  appId: "1088593",
  key: "aba59cc7ba83cc677c53",
  secret: "8f0686d11e2ef3bb0bf8",
  cluster: "mt1",
  encrypted: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});

// "mongodb+srv://HueyWhyte:Famous10@whyte-wdm4x.mongodb.net/whyte?retryWrites=true&w=majority" ||
// "mongodb://127.0.0.1:27017/schway";
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://HueyWhyte:Famous10@whyte-wdm4x.mongodb.net/whyte?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connection");

  // feed stream
  const feedCollection = db.collection("feeds");
  const feedChangeStream = feedCollection.watch();
  feedChangeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const feedData = change.fullDocument;
      pusher.trigger("feeds", "inserted", {
        user: feedData.user,
        body: feedData.body,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });

  // comment stream
  const commentCollection = db.collection("comments");
  const commentChangeStream = commentCollection.watch();
  commentChangeStream.on("comments", (change) => {
    if (change.operationType === "insert") {
      const commentData = change.fullDocument;
      pusher.trigger("feeds", "inserted", {
        user: commentData.user,
        body: commentData.body,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 1437;
app.listen(PORT, () => console.log(`Server running`));

// Famous10@stanleyotabil_fuckuall360_ilovecoding = JWT_SECRET

// mongodb+srv://HueyWhyte:Famous10@whyte-wdm4x.mongodb.net/whyte?retryWrites=true&w=majority = MONGODB_URI
