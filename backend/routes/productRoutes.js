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

router.route("/").get(getAll).post(protect, admin, create);
router.get("/bestseller", getBestSellers);
router.route("/").post(create).get(protect, admin, getAll);
router
  .route("/:id")
  .get(getById)
  .delete(protect, admin, remove)
  .put(protect, admin, update);

export default router;
