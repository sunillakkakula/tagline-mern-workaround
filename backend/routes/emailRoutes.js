import express from "express";
const router = express.Router();
import { sendVTTEmail } from "../controllers/emailController.js";

router.route("/").get(sendVTTEmail);

export default router;
