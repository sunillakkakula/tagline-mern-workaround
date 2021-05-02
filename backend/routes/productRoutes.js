import express from "express";
const router = express.Router();
import {
  getAll,
  getById,
  remove,
  create,
  update,
  getBestSellers,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.get("/bestseller", getBestSellers);
router.route("/").post(create);
router.route("/").get(getAll);

router.route("/:id").get(getById).delete(remove).put(update);

export default router;
