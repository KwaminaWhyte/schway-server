const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/feeds", require("./routes/feedRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/comment", require("./routes/commentRoutes"));

mongoose
  .connect(
    "mongodb+srv://HueyWhyte:Famous10@whyte-wdm4x.mongodb.net/whyte?retryWrites=true&w=majority" ||
      "mongodb://127.0.0.1:27017/schway",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = 1437;
app.listen(process.env.PORT || PORT, () => console.log(`Server running`));
