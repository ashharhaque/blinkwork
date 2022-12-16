const express = require("express");
const router = express.Router();
const {createOrder,getAllOrders,getSingleOrder,removeSingleOrder,updateSingleOrder,searchTextDesc}=require("./../controller/orders")
router.post(
    "/order",
    createOrder
  );

  router.get(
    "/orders",
    getAllOrders
  );


  router.get(
    "/order/:id",
    getSingleOrder
  );
  router.delete(
    "/order/:id",
    removeSingleOrder
  );
  router.put("/order",updateSingleOrder)
  router.post("/search",searchTextDesc)
module.exports = router;