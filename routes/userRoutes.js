const express = require("express");
const router = express.Router();
const User = require("../modals/User");

// Get single user
router.get("/:id", (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

// Register User
router.post("/register", async (req, res) => {
  let { firstname, lastname, username, email, password } = req.body;

  const emailExists = await User.findOne({ email: email });
  if (emailExists) return res.status(400).send("Email already exists!");

  // Hashing the Password
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password,
    // password: hashedPassword,
  });

  user
    .save()
    .then((res) => console.log(res))
    .catch((err) => res.send(err));
});

// Login User
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // CHeck if email exists in database
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send("User does not exists");

  // Check if password is correct
  // const validPass = await bcrypt.compare(password, user.password);
  // if (!validPass) return res.status(400).send("Invalid Password");

  res.send(user._id);
});

module.exports = router;
