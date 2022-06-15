const express = require("express");
const productRouter = express.Router();
const { Products } = require("../models");
const {Op}=require("sequelize")

productRouter.get("/", (req, res) => {
  Products.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => console.log(err));
});

productRouter.get("/:id", (req, res) => {
  Products.findByPk(req.params.id)
    .then((product) => res.status(200).send(product))
    .catch((err) => console.log(err));
});

productRouter.post("/", (req, res) => {
  Products.create(req.body)
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => {
      console.log(err);
    });
});

productRouter.put("/:id", (req, res) => {
  Products.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((product) => {
    res.status(200).send(product);
  });
});

productRouter.delete("/:id",(req,res)=>{
  const {id}=req.params
  Products.destroy({where:{id}})
  res.sendStatus(204)
})

productRouter.get("/search/:search", (req,res)=>{
  Products.findAll({where:{product_name:{[Op.iLike]:`%${req.params.search}%`}}})
  .then(products=>{ res.status(201).send(products)})
})

productRouter.get("/category/:category", (req,res)=>{
  Products.findAll({where:{category:req.params.category}})
  .then(products=>{ res.status(201).send(products)})
})

productRouter.post("/categories",(req,res)=>{
  Products.findAll()
  .then(categories => {
    categories = categories.map(product=>product.category)
    const categoryArray = []
    categories.forEach(category => !categoryArray.includes(category) && categoryArray.push(category))
    res.send(categoryArray)
  })
})

productRouter.put("/category/:category", (req, res)=>{
  Products.update(req.body, {
    where: {
      category: req.params.category},
    returning: true
  }).then((category) => {
    res.status(200).send(category)
  })
})



module.exports = productRouter;
