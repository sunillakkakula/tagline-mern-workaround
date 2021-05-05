import asyncHandler from "express-async-handler";
import AvailableInDomestic from "../models/availableInDomesticModel.js";

// @desc    Fetch all availableInDomestic
// @route   GET /api/availableInDomestic
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

  const count = await AvailableInDomestic.countDocuments({ ...keyword });
  const availableInDomestic = await AvailableInDomestic.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ availableInDomestic, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single category
// @route   GET /api/categorys/:id
// @access  Public
const getById = asyncHandler(async (req, res) => {
  const availableInDomestic = await AvailableInDomestic.findById(req.params.id);

  if (availableInDomestic) {
    res.json(availableInDomestic);
  } else {
    res.status(404);
    throw new Error("Available In Domestic not found");
  }
});

// @desc    Delete a category
// @route   DELETE /api/categorys/:id
// @access  Private/Admin
const remove = asyncHandler(async (req, res) => {
  const availableInDomestic = await AvailableInDomestic.findById(req.params.id);

  if (availableInDomestic) {
    await availableInDomestic.remove();
    res.json({ message: "Available In Domestic removed" });
  } else {
    res.status(404);
    throw new Error("Available In Domestic not found");
  }
});

// @desc    Create a category
// @route   POST /api/categorys
// @access  Private/Admin
const create = asyncHandler(async (req, res) => {
  const {} = req.body;
  const {
    unitOfMessure,
    qty,
    unitPrice,
    sellingPrice,
    mrp,
    product,
  } = req.body;

  const availableInDomestic = new AvailableInDomestic({
    unitOfMessure,
    qty,
    unitPrice,
    sellingPrice,
    mrp,
    product,
  });

  const createdAvailableInDomestic = await availableInDomestic.save();
  res.status(201).json(createdAvailableInDomestic);
});

// @desc    Update a category
// @route   PUT /api/categorys/:id
// @access  Private/Admin
const update = asyncHandler(async (req, res) => {
  const {
    unitOfMessure,
    qty,
    unitPrice,
    sellingPrice,
    mrp,
    product,
  } = req.body;
  const availableInDomestic = await AvailableInDomestic.findById(req.params.id);

  if (availableInDomestic) {
    availableInDomestic.unitOfMessure = unitOfMessure;
    availableInDomestic.qty = qty;
    availableInDomestic.unitPrice = unitPrice;
    availableInDomestic.sellingPrice = sellingPrice;
    availableInDomestic.mrp = mrp;
    availableInDomestic.product = product;

    const updatedAvailableInDomestic = await availableInDomestic.save();
    res.json(updatedAvailableInDomestic);
  } else {
    res.status(404);
    throw new Error("Available In Domestic not found");
  }
});

// @desc    Fetch single category
// @route   GET /api/categorys/:id
// @access  Public
const getAllByProductId = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  const availableInDomestics = await AvailableInDomestic.find();
  const filteredDomestic = availableInDomestics.filter(
    (domestic) => domestic.product === productId
  );
  console.log(filteredDomestic);
  if (filteredDomestic) {
    res.json(filteredDomestic);
  } else {
    res.status(404);
    throw new Error(`Available In Domestic  not found ${productId}`);
  }
});

export { getAll, getById, remove, create, update, getAllByProductId };
