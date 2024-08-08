import express from "express";
import { createComment, deleteComment, editComment, likeComment, getComments, getPostComments } from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.get("/getComments", verifyToken, getComments);
router.get("/getPostComments/:postId", verifyToken, getPostComments);

export default router;
