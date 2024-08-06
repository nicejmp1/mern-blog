import express from "express";
import { test, updateUser, deleteUser, signout, getUsers } from "../controllers/user.controller.js"; // deleteUser 추가
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser); // 슬래시 수정
router.delete("/delete/:userId", verifyToken, deleteUser); // 슬래시 수정
router.post("/signout", signout);
router.get("/getusers", verifyToken, getUsers);

export default router;
