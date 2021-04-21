import mongoose from "mongoose";
import dontenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDb from "./config/db.js";

dontenv.config();
connectDb();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const transformedProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(transformedProducts);
    console.log(`Data Imported .!`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Failed Import !${error.message}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data Deleted .!`.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Failed Delete !${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") deleteData();
else importData();
