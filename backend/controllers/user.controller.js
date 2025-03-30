import { validationResult } from "express-validator";
import * as userServices from "../services/user.service.js";
import User from "../models/user.model.js";
import redisClient from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userServices.createUser(
      req.body.email,
      req.body.password
    );
    const token = await user.generateJWT();

    delete user._doc.password;

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const loginUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .send("User not found")
        .json({ error: "Invalid Credentials" });
    }

    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .send("User not found")
        .json({ error: "Invalid Credentials" });
    }
    const token = await user.generateJWT();

    delete user._doc.password;

    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const profileController = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
