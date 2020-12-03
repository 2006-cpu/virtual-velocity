const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "hello" } = process.env;

const { createUser, getUserByUsername, getUser, getOrdersByUser } = require("../db/utils");

const { requireUser } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, firstName, lastName, email, isAdmin, imageURL} = req.body;

  try {
    const user = await getUserByUsername(username);

    if (user) {
      res.send({ message: "A user by that username already exists!" });
    } else if (password.length <= 8) {
      res.send({ message: "Password too short!" });
    } else {
      const user = await createUser({ username, password, firstName, lastName, email, isAdmin: false, imageURL: ''});

      const token = jwt.sign(user, JWT_SECRET);

      res.send({ message: "thanks for signing up!", user: user, token });
      return user;
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUser({ username, password });

    if (user) {
      const token = jwt.sign(user, JWT_SECRET);

      res.send({
          message: "you're logged in!",
          user,
          token
      });

    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect!",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/orders", requireUser, async (req, res, next) => {
    const { userId } = req.params;
    try {
      const orders = await getOrdersByUser(req.user);
      res.send(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = usersRouter;
