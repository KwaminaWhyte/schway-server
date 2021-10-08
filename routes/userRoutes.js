const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../modals/User");
const auth = require("../utils/auth");

// Get single user
router.get("/:username", (req, res) => {
  User.findOne({ username: req.params.username })
    .populate("followers")
    .then((user) => res.send(user))
    .catch((err) => console.log({ msg: err }));
});

// Get all users
router.get("/", auth, (req, res) => {
  User.find()
    .where("_id")
    .populate("followers")
    .ne(req.user.id)
    .then((users) => res.send(users))
    .catch((err) => console.log({ msg: err }));
});

// Register User
router.post("/register", async (req, res) => {
  let { firstname, lastname, username, email, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).send("Username is already taken");

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).send("Email already exists!");

  // Hashing the Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
  });

  user
    .save()
    .then((user) => {
      jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "Famous10",
        { expiresIn: 864000 },
        (err, token) => {
          if (err) throw err;
          res.send({ token, user });
        }
      );
    })
    .catch((err) => res.send(err));
});

// Login User
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  // CHeck if email exists in database
  const user = await User.findOne({ email: email })
    .populate("followers")
    .populate("following");

  if (!user) return res.status(400).send("User does not exists");

  // Check if password is correct
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid Password");

  jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "Famous10",
    { expiresIn: 864000 },
    (err, token) => {
      if (err) throw err;
      res.send({ token, user });
    }
  );
});

router.get("/auth/user", auth, (req, res) => {
  User.findById(req.user.id)
    .populate("followers")
    .select("-password")
    .then((user) => res.send(user))
    .catch((err) => console.log(err));
});

// update
router.post("/me/update", auth, async (req, res) => {
  let { profile_img, firstname, lastname, username, email } = req.body;

  let isUser = await User.findById(req.user.id);

  if (!isUser) return res.status(401).send("User does not exist!");

  await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_img,
      lastname,
      firstname,
      email,
      username,
    },
    (data) => {
      res.send(data);
    }
  );
});

module.exports = router;
