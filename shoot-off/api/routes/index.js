const express = require("express");

const productRouter=require("./product")
const router = express.Router();

router.use("/product", productRouter)


module.exports = router;