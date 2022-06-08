const express = require("express");
const productRouter = express.Router();
const { Products } = require("../models");

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

module.exports = productRouter;
