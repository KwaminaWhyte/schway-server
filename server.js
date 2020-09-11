const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/feeds", require("./routes/feedRoutes"));
app.use("/user", require("./routes/userRoutes"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/schway", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = 1437;
app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}. Access it using http://localhost:1437/`
  )
);
