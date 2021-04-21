import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDb();
const app = express();

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server Listening on PORT ${PORT} in ${process.env.NODE_ENV}`.cyan.underline
  )
);
