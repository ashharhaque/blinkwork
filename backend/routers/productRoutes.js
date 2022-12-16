const express = require("express");
const router = express.Router();


const {createProduct,getProducts}=require("./../controller/products");

router.post(
  "/product",
  createProduct
);
router.get(
  "/product",
  getProducts
);

module.exports = router;