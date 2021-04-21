import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();
/*
    @desc Fetch All Products
    @route GET /api/products
    @access pUBLIC
*/
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

/*
    @desc Fetch Product by ID
    @route GET /ap/products/:ID
    @access PUBLIC
*/

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    console.log(
      "req.params.id : " + req.params.id + "type:" + typeof req.params.id
    );
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json(`Product Not Found : ${req.params.id}`);
  })
);

export default router;
