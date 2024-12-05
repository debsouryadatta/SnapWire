import express from 'express';
import { Request, Response } from 'express';
import User from '../models/user';

const router = express.Router();

// Get all users except current user
router.get("/users/:userId", (req: Request, res: Response) => {
  const loggedInUserId = req.params.userId;

  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Error retrieving users", err);
      res.status(500).json({ message: "Error retrieving users" });
    });
});

// Send friend request
router.post("/friend-request", async (req: Request, res: Response) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { freindRequests: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Get friend requests
router.get("/friend-request/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("freindRequests", "name email image")
      .lean();

    const freindRequests = user?.freindRequests || [];
    res.json(freindRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Accept friend request
router.post("/friend-request/accept", async (req: Request, res: Response) => {
  try {
    const { senderId, recepientId } = req.body;

    const sender = await User.findById(senderId);
    const recepient = await User.findById(recepientId);

    if (!sender || !recepient) {
      return res.status(404).json({ message: "User not found" });
    }

    sender.friends.push(recepientId);
    recepient.friends.push(senderId);

    recepient.freindRequests = recepient.freindRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentFriendRequests = sender.sentFriendRequests.filter(
      (request) => request.toString() !== recepientId.toString()
    );

    await sender.save();
    await recepient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get accepted friends
router.get("/accepted-friends/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );
    const acceptedFriends = user?.friends || [];
    res.json(acceptedFriends);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get sent friend requests
router.get("/friend-requests/sent/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId)
      .populate("sentFriendRequests", "name email image")
      .lean();

    const sentFriendRequests = user?.sentFriendRequests || [];
    res.json(sentFriendRequests);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal Server" });
  }
});

// Get friend IDs
router.get("/friends/:userId", (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    User.findById(userId)
      .populate("friends")
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const friendIds = user.friends.map((friend) => friend._id);
        res.status(200).json(friendIds);
      });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "internal server error" });
  }
});

export default router;
