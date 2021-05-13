import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import SubCategory from "../models/subCategoryModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAll = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// getAllBySubCategory;

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getAllBySubCategory = asyncHandler(async (req, res) => {
  let filtered = [];
  const subCategoryId = req.params.id;

  const products = await Product.find();

  if (products) {
    filtered = products.filter((eachProduct) => {
      return eachProduct.subCategory.toString() === subCategoryId.toString();
    });
    console.log(filtered);
    if (filtered) {
      res.json(filtered);
    } else {
      res.status(404);
      throw new Error(`Products not found for ${subCategoryId}`);
    }
  }
});

// @desc    Fetch products bu cat ID
// @route   GET /api/products/cat/:id
// @access  Public
const getAllProductsByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;
  let products = [];
  let filteredSubCategories = [];
  let filteredProducts = [];
  const subCategories = await SubCategory.find({});

  if (subCategories) {
    filteredSubCategories = subCategories.filter((eachSubCat) => {
      console.log(
        "eachSubCat.category : " +
          eachSubCat.category +
          " Type : " +
          typeof eachSubCat.category +
          ", categoryId: " +
          categoryId +
          ", Type : " +
          typeof categoryId
      );
      return eachSubCat.category.toString() === categoryId;
    });
    if (filteredSubCategories) {
      console.log(
        "filteredSubCategories Size :--> " + filteredSubCategories.length
      );
      products = await Product.find();
      filteredSubCategories.forEach((fsb) => {
        console.log(fsb.category);
        products.forEach((product) => {
          if (fsb._id.toString() === product.subCategory.toString()) {
            console.log("Matched Rec : " + product);
            filteredProducts = [...filteredProducts, product];
          }
        });
      });

      if (filteredProducts) {
        console.log("filteredProducts Size :--> " + filteredProducts.length);
        res.json(filteredProducts);
      } else {
        console.log("No Matched Products  for CategoryId:--> " + categoryId);
        res.json(filteredProducts);
      }
    } else {
      throw new Error(`Sub Category not found for the ${categoryId}`);
    }
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    brand,
    subCategory,
    countInStock,
    isTaxable,
    taxPercent,
    isVttBestSeller,
    user,
  } = req.body;

  const product = new Product({
    name,
    description,
    user: user,
    imageUrl: imageUrl,
    brand,
    subCategory: subCategory,
    countInStock,
    isTaxable,
    taxPercent,
    isVttBestSeller,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    imageUrl,
    brand,
    subCategory,
    countInStock,
    isTaxable,
    taxPercent,
    isVttBestSeller,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.imageUrl = imageUrl;
    product.description = description;
    product.imageUrl = imageUrl;
    product.brand = brand;
    product.countInStock = countInStock;
    product.subCategory = subCategory;
    product.isTaxable = isTaxable;
    product.taxPercent = taxPercent;
    product.isVttBestSeller = isVttBestSeller;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getBestSellers = asyncHandler(async (req, res) => {
  const products = await Product.find({ isVttBestSeller: true })
    .sort({ rating: -1 })
    .limit(3);

  res.json(products);
});

export {
  getAll,
  getById,
  remove,
  create,
  update,
  getBestSellers,
  getAllBySubCategory,
  getAllProductsByCategory,
};
