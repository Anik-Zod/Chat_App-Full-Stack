import express from "express";
import { createGroup, deleteGroup, addUser, sendMessage, getGroups } from "../controllers/group.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js"; // Corrected import

const router = express.Router();

// Create a new group (Protected)
router.post("/", protectRoute, createGroup);

// get all groups
router.get("/getGroups",getGroups)

// Delete a group (Protected)
router.delete("/:groupId", protectRoute, deleteGroup);

// Add users to a group (Protected)
router.put("/:groupId/add-users", protectRoute, addUser);

// Send a message in a group (Protected)
router.post("/:groupId/messages", protectRoute, sendMessage);

export default router;
