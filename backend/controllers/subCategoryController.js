import asyncHandler from "express-async-handler";
import SubCategory from "../models/subCategoryModel.js";

// @desc    Fetch all subCategories
// @route   GET /api/subCategories
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

  const count = await SubCategory.countDocuments({ ...keyword });
  const subCategories = await SubCategory.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ subCategories, page, pages: Math.ceil(count / pageSize) });
});

// getAllByCategoryId;

// @desc    Fetch Sub category
// @route   GET /api/categorys/:id
// @access  Public
const getAllByCategoryId = asyncHandler(async (req, res) => {
  let subCategories = [];
  const categoryId = req.params.id;
  console.log(`Fetching Sub Categories by Category Id :${categoryId}`);
  subCategories = await SubCategory.find();
  let filtered = [];
  if (subCategories) {
    filtered = subCategories.filter((eachSubCat) => {
      return eachSubCat.category.toString() === categoryId.toString();
    });
    console.log(filtered);
    res.json(filtered);
  } else {
    res.status(404);
    throw new Error(`Sub Category not found for the ${categoryId}`);
  }
});

// @desc    Fetch single category
// @route   GET /api/categorys/:id
// @access  Public
const getById = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (subCategory) {
    res.json(subCategory);
  } else {
    res.status(404);
    throw new Error("Sub Category not found");
  }
});

// @desc    Delete a category
// @route   DELETE /api/categorys/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id);

  if (subCategory) {
    await subCategory.remove();
    res.json({ message: "Sub Category removed" });
  } else {
    res.status(404);
    throw new Error("Sub Category not found");
  }
});

// @desc    Create a category
// @route   POST /api/categorys
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  const { name, description, category } = req.body;
  console.log(req.body);
  console.log(
    "EXEC create of subCategories with Name : " +
      name +
      " , category : " +
      category
  );
  const subCategory = new SubCategory({
    name,
    description,
    imageUrl: "",
    category,
  });

  const createdSubCategory = await subCategory.save();
  res.status(201).json(createdSubCategory);
});

// @desc    Update a category
// @route   PUT /api/categorys/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const subCategory = await SubCategory.findById(req.params.id);

  if (subCategory) {
    subCategory.name = name;
    subCategory.description = description;
    const updatedSubCategory = await subCategory.save();
    res.json(updatedSubCategory);
  } else {
    res.status(404);
    throw new Error("Sub Category not found");
  }
});

export { getAll, getById, remove, create, update, getAllByCategoryId };
