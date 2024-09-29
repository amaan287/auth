import { getUser, signOut } from "../controller/user.controller.js";
import express from "express";

const router = express.Router();
router.post("/signout", signOut);
router.get("/:userId", getUser);

export default router;
