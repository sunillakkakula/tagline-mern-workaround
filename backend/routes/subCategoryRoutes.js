import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  remove,
  getById,
  update,
  getAllByCategoryId,
} from "../controllers/subCategoryController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(create).get(getAll);
router.route("/").get(getAll);
router.route("/catId/:id").get(getAllByCategoryId);
router.route("/:id").delete(remove).get(getById).put(update);

export default router;
