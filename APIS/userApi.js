const express = require("express");
const router = new express.Router();
const User = require("../src/models/users");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  const checkUser = await User.findOne({ email: user.email });
  try {
    if (!checkUser) {
      await user.save();
      res.status(201).send(user);
    } else {
      res.status(409).send({ error: "User already exist" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  try {
    if (!user) {
      return res.status(404).send("Invalid username");
    } else {
      const plainPwd = req.body.password;
      const checkPwd = await bcrypt.compare(plainPwd, user.password);
      if (checkPwd) {
        //create and send token
        let signedToken = jwt.sign(
          { username: user.username },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "10m" }
        );
        //send token as res
        res.send({ message: "success", token: signedToken, user: user });
      } else res.status(403).send("Invalid password");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
