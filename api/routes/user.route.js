import express from "express";
import { test } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
// router.put("/update", updateUser);
// router.delete("/delete", deleteUser);
// router.post("/signout", signOut);
// router.get("/getuser", getUsers);


export default router;