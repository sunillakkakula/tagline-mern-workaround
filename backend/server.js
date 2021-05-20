import express from "express";
import bodyParser from "body-parser";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import availableInBulkRoutes from "./routes/availableInBulkRoutes.js";
import availableInDomesticRoutes from "./routes/availableInDomesticRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();
const app = express();
app.use(express.json());
// app.use(require("connect").bodyParser());
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/avail-bulk", availableInBulkRoutes);
app.use("/api/avail-domestic", availableInDomesticRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/email", emailRoutes);

app.use(notFound);
app.use(errorHandler);
/** 
app.use((req, res, next) => {
  const error = new Error(`Not Found  - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
});
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server Listening on PORT ${PORT} in ${process.env.NODE_ENV}`.cyan.underline
  )
);
