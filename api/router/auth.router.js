import { signUp, signin } from "../controller/auth.contoller.js";
import express from "express";

const router = express.Router();
router.post("/signup", signUp);
router.post("/signin", signin);

export default router;
