import express from "express";
const router = express.Router();
import {
  create,
  getAll,
  remove,
  getById,
  update,
  getAllByProductId,
} from "../controllers/availableInBulkController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAll);
router.route("/").post(create).get(getAll);
router.route("/:id").delete(remove).get(getById).put(update);
router.route("/product/:id").get(getAllByProductId);

export default router;
