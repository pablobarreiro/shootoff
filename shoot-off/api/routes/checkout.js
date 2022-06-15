const express = require("express");
const checkoutRouter = express.Router();
const { Cart, Sales, Products, Users } = require("../models");
const sequelize = require('sequelize')
const { sendPurchaseMail } = require('../utils/mail')

// COMPRA DE CARRITO ACTUAL
checkoutRouter.post('/:id', (req,res) => { // enviar el id de usuario a traves params
    const id = req.params.id
    Cart.findAll({where:{ userId: id }}) // busco todas las compras que realizo un usuario en el modelo Cart
    .then(cartProducts => {
        cartProducts = cartProducts.map(e=> e.dataValues) //hago el map con dataValues porque sino no lo toma
        Sales.bulkCreate(cartProducts) // duplico la info en el modelo Sales
        .then(createdSales => {
            createdSales.forEach( sale => sale.setUser(cartProducts[0].user_id))
            createdSales.forEach(( sale, i ) => sale.setProduct(cartProducts[i].product_id))
        })
        return cartProducts
    })
    .then(cartProducts => {
        const ids = cartProducts.map(e => e.id)
        Cart.destroy({where:{ id:ids }}) // vacio el carrito actual para ese usuario (todas las compras de un usuario en el modelo Cart)
        Sales.max('order_number') // busco el nro de orden mas alto y le agrego 1
        .then((maxOrderNumber) => {
            const newOrderNumber = maxOrderNumber + 1 
            Sales.update({ order_number: newOrderNumber },{where:{order_number:0},returning:true}) // guardo todas las filas de la ultima compra con el ultimo nro de orden
        })
    })
    .then(() => {
        // // ENVIAR MAIL DE CONFIRMACION DE COMPRA
        // Sales.findOne({
        //     attributes: [sequelize.fn('max', sequelize.col('order_number'))], 
        //     raw:true,
        //     include:{ model: Users }
        // })
        // .then(saleUser => sendPurchaseMail(saleUser.users.email,saleUser.order_number))
        res.sendStatus(201)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('hubo un error', err)
    })
})

// CONFIRMAR UN PEDIDO
checkoutRouter.put('/confirm/:order_number',(req,res) => { // enviar order_number por params
    const {order_number} = req.params.order_number
    Sales.update({status:'confirmed'},{where:{ order_number:Number(order_number) },returning:true})
    .then(updatedSales => res.send(updatedSales))
    .catch(err => {
        console.log(err)
        res.status(500).send('hubo un error', err)
    })
})

// RECHAZAR UN PEDIDO
checkoutRouter.put('/reject/:order_number',(req,res) => { // enviar order_number por params
    const order_number = req.params.order_number
    Sales.update({status:'rejected'},{where:{ order_number:Number(order_number) },returning:true})
    .then(updatedSales => res.send(updatedSales))
    .catch(err => {
        console.log(err)
        res.status(500).send('hubo un error', err)
    })
})

// HISTORIAL DE PEDIDOS DE UN USUARIO
checkoutRouter.get('/sales/:id',(req,res) => { // enviar id por params
    const id = req.params.id
    console.log("TYPEOF ID",typeof id)
    Sales.findAll({where:{ user_id:id },include:{model: Products}})
    .then(sales => {
        const returnObj = sales.map( e => {
            return {
                id: e.id,
                user_id: e.user_id,
                quantity: e.quantity,
                order_number: e.order_number,
                product_id: e.product_id,
                product_name: e.product.product_name,
                price: e.product.price,
                category: e.product.category,
                stock: e.product.stock,
                vote: e.product.vote,
                vote_count: e.product.vote_count,
                coments: e.product.coments,
                img_url: e.product.img_url
            }
        })
        res.send(returnObj)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send('hubo un error', err)
    })
})

module.exports= checkoutRouter