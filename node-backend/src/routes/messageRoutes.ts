import express from 'express';
import { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Message from '../models/message';
import User from '../models/user';

const router = express.Router();

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: Function) {
    cb(null, "./files");
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: Function) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Post message
router.post("/messages", upload.single("imageFile"), async (req: Request, res: Response) => {
  try {
    const { senderId, recepientId, messageType, messageText } = req.body;
    let photoUrl = null;

    if (messageType === "image" && req.file) {
      photoUrl = await cloudinary.uploader.upload(`${req.file.path}`, {
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
        folder: 'snapwire'
      });
    }

    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      message: messageText,
      timestamp: new Date(),
      imageUrl: messageType === "image" && photoUrl ? photoUrl.secure_url : null,
    });

    await newMessage.save();
    res.status(200).json({ message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get user details
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const recepientId = await User.findById(userId);
    res.json(recepientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get messages between users
router.get("/messages/:senderId/:recepientId", async (req: Request, res: Response) => {
  try {
    const { senderId, recepientId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, recepientId: recepientId },
        { senderId: recepientId, recepientId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete messages
router.post("/deleteMessages", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "invalid req body!" });
    }

    await Message.deleteMany({ _id: { $in: messages } });
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server" });
  }
});

export default router;
