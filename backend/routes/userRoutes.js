import express from "express";
const router = express.Router();
import {
  authenticate,
  create,
  getProfile,
  updateProfile,
  getAll,
  remove,
  getById,
  update,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(create);
router.post("/login", authenticate);
router.route("/").get(getAll);
router.route("/profile").get(getProfile).put(updateProfile);
router.route("/:id").delete(remove).get(getById).put(update);

export default router;
