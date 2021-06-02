const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/feeds", require("./routes/feedRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/comment", require("./routes/commentRoutes"));

// "mongodb+srv://HueyWhyte:Famous10@whyte-wdm4x.mongodb.net/whyte?retryWrites=true&w=majority" ||
// "mongodb://127.0.0.1:27017/schway";
// process.env.MONGODB_URI
mongoose
  .connect("mongodb://127.0.0.1:27017/schway", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

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
