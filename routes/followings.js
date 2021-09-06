const { Router } = require("express");

const router = Router();
const User = require("../modals/User");
const auth = require("../middlewares/auth");

router.post("/follow", auth, async (req, res) => {
  const { uid } = req.body;
  const theUser = await User.findById(uid);

  if (!theUser) return res.status(400).send("User not found");

  theUser.followers.unshift({ user: req.user.id });
  await theUser.save();

  return await res.send(theUser.followers);
});

router.post("/unfollow", (req, res) => {
  console.log("asdfas");
});

router.get("/get_followers", (req, res) => {
  console.log("asdfas");
});

module.exports = router;
