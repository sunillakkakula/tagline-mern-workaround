import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  remove,
  getById,
  update,
} from "../controllers/subCategoryController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(create).get(protect, admin, getAll);
router
  .route("/:id")
  .delete(protect, admin, remove)
  .get(protect, admin, getById)
  .put(protect, admin, update);

export default router;