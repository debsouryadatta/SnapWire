import express from 'express';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();

// Function to create a token for the user
const createToken = (userId: string): string => {
  const payload = {
    userId: userId,
  };
  return jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "365d" });
};

// Register endpoint
router.post("/register", (req: Request, res: Response) => {
  const { name, email, password, image } = req.body;

  const newUser = new User({ name, email, password, image });

  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering the user!" });
    });
});

// Login endpoint
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and the password are required" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid Password!" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log("error in finding the user", error);
      res.status(500).json({ message: "Internal server Error!" });
    });
});

export default router;
