import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getAll = asyncHandler(async (req, res) => {
  console.log("Exec getAll of Category");
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

  const count = await Category.countDocuments({ ...keyword });
  const categories = await Category.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  console.log("categories : " + categories);
  res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single category
// @route   GET /api/categorys/:id
// @access  Public
const getById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete a category
// @route   DELETE /api/categorys/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Create a category
// @route   POST /api/categorys
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const category = new Category({
    name: name,
    description: description,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/categorys/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  console.log(
    "Exc update from categoryController..!",
    name,
    description,
    req.params.id
  );
  const categoryExists = await Category.findById(req.params.id);

  if (categoryExists) {
    console.log("Category  FOUND");
    categoryExists.name = name;
    categoryExists.description = description;
    console.log(
      "Category  BEFORE SAVE  :",
      categoryExists.name,
      categoryExists.description
    );
    const updatedCategory = await categoryExists.save();
    console.log("Category  UPDATED :" + updatedCategory);
    res.json(updatedCategory);
  } else {
    console.log("Category not found");
    res.status(404);
    throw new Error("Category not found");
  }
});

export { getAll, getById, remove, create, update };
