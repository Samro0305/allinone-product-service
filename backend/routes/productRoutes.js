const express = require("express");
const router = express.Router();

const product = require("../models/productModel");
const db = require("../db");

// Get all products
router.get("/products", (req, res) => {
  product.getAllProducts((err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Create product
router.post("/products", (req, res) => {
  product.createProduct(req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product Added" });
  });
});

// Delete product
router.delete("/products/:id", (req, res) => {
  product.deleteProduct(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

// Update product
router.put("/products/:id", (req, res) => {
  product.updateProduct(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
});

// Search products with pagination
router.get("/products/search", (req, res) => {

  const q = req.query.q || "";
  const page = parseInt(req.query.page) || 1;

  product.searchProducts(q, page, (err, rows) => {
    if (err) return res.status(500).json(err);

    res.json({
      page: page,
      results: rows
    });
  });

});

// Product detail API
router.get("/products/:id", (req, res) => {

  const id = req.params.id;

  db.get("SELECT * FROM products WHERE id=?", [id], (err, row) => {

    if (err) return res.status(500).json(err);

    res.json(row);

  });

});

module.exports = router;