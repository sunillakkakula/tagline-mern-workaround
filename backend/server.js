import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDb();
const app = express();

app.use("/api/products", productRoutes);
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
