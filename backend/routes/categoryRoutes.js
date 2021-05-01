import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(create);
router.route("/").get(getAll);
router.route("/:id").delete(remove).get(getById).put(update);

export default router;
