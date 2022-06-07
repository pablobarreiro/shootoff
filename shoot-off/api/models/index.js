const Users = require ("./Users")
const Sales = require ("./Sales")
const Products = require ("./Products")
const Cart = require ("./Cart")

Sales.belongsTo(Users)
Users.hasMany(Sales)

Products.belongsToMany(Cart, {through: 'products_to_carts'})
Cart.belongsToMany(Products, {through: 'products_to_carts'})

Products.belongsToMany(Sales, {through: 'products_to_sales'})
Sales.belongsToMany(Products, {through: 'products_to_sales'})

Users.belongsToMany(Products, {through: 'users_to_products'})
Products.belongsToMany(Users, {through: 'users_to_products'})

Users.belongsTo(Cart)
Cart.hasOne(Users)

module.exports = {Users, Sales, Products, Cart}