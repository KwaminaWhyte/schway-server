const { Router } = require("express");

const router = Router();
const User = require("../modals/User");
const auth = require("../utils/auth");

// follow
router.post("/follow", auth, async (req, res) => {
  let { userId } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    $push: { following: userId },
  });
  await User.findByIdAndUpdate(userId, {
    $push: { followers: req.user.id },
  });

  res.send(`Done!, You started following  ${userId}`);
});

// unfollow
router.post("/unfollow", auth, async (req, res) => {
  let { userId } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: userId },
  });

  await User.findByIdAndUpdate(userId, {
    $pull: { followers: req.user.id },
  });

  res.send(`Done!, You unfollowed ${userId}`);
});

module.exports = router;
