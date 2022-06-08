const express = require("express");
const cartRouter = express.Router();
const { Cart, Users, Products } = require("../models");

cartRouter.get("/:user_id", (req, res) => {
  Cart.findAll({
    where: { user_id: req.params.user_id },
    include: { model: Products },
  }).then((productsCart) => {
    console.log(productsCart)
    const productList=productsCart.map(e=>{return {product:e.products[0], cantidad:e.quantity}})
    res.send(productList)
  });
});

cartRouter.post("/", (req, res) => {
  Products.findByPk(req.body.product_id).then((product) => {
    if (product)
      Cart.create(req.body)
        .then((cart) => {
          Users.findByPk(req.body.user_id).then((user) => {
            cart.setUser(user);
          });
          cart.addProduct(product);
          res.sendStatus(201)
        })
        .catch((err) => console.log(err));
    else {
      res.send("El producto no existe");
    }
  });
});

cartRouter.put("/:id", (req, res) => {
  Cart.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((product) => {
    res.status(200).send(product);
  });
});

cartRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  Cart.destroy({ where: { id } });
  res.sendStatus(204);
});

module.exports = cartRouter;
