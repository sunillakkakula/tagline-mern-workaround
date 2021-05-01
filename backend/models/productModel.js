import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "SubCategory",
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    description: {
      type: String,
    },
    
    countInStock: {
      type: Number,
      required: true,
    },
    isTaxable: {
      type: Boolean,
      required: true,
    },
    taxPercent: {
      type: Number,
      required: true,
    },
    isVttBestSeller: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
