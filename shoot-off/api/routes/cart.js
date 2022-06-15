const express = require("express");
const cartRouter = express.Router();
const { Cart, Users, Products } = require("../models");

cartRouter.get("/:user_id", (req, res) => {
  Cart.findAll({order: [["id", "ASC"]],
    where: { user_id: req.params.user_id },
    include: { model: Products },
  }).then((productsCart) => {
    const productList=productsCart.map(e=>{return {       
      id: e.id,       
      user_id: e.user_id,       
      quantity: e.quantity,       
      product_id: e.product_id,       
      product_name: e.product.product_name,       
      price: e.product.price,       
      img_url: e.product.img_url,       
      category: e.product.category,   
    }})
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
          cart.setProduct(product);
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
