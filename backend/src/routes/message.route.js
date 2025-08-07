import express from "express";
import {getUsersforSidebar,getMessages,sendMessages,deleteMessage} from "../controllers/message.controller.js"
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

router.get("/users", protectRoute, getUsersforSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessages);
router.delete("/:messageId", protectRoute, deleteMessage);

export default router;
