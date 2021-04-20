import express from "express";
import connectDb from "./config/db.js";
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => res.json("Hello Tagline Traders.!"));
app.get("/api/products", (req, res) => res.json(products));
app.get("/api/product/:id", (req, res) => {
  const product = products.find((p) => p._id.toString() === req.params.id);
  console.log(product);
  res.json(product);
});
app.listen(5000, () => console.log("Server Listening on PORT 5000"));
