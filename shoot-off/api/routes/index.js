const express = require("express");
const cartRouter=require("./cart")
const productRouter=require("./product")
const userRouter=require("./user")
const router = express.Router();

router.use("/product", productRouter)
router.use("/cart", cartRouter)
router.use("/user", userRouter)


module.exports = router;