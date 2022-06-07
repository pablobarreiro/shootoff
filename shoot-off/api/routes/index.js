const express = require("express");

const productRouter=require("./product")
const userRouter=require("./user")
const router = express.Router();

router.use("/product", productRouter)
router.use("/user", userRouter)


module.exports = router;