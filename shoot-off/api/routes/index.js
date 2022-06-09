const express = require("express");
const cartRouter=require("./cart")
const productRouter=require("./product")
const userRouter=require("./user")

const checkoutRouter=require("./checkout")

const router = express.Router();

router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/cart",cartRouter)
router.use("/checkout", checkoutRouter)


module.exports = router;