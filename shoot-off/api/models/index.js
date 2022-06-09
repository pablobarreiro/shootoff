const Users = require ("./Users")
const Sales = require ("./Sales")
const Products = require ("./Products")
const Cart = require ("./Cart")

Sales.belongsTo(Users)
Users.hasMany(Sales)

Cart.belongsTo(Products)
Products.hasMany(Cart)

Sales.belongsTo(Products)
Products.hasMany(Sales)

Users.belongsToMany(Products, {through: 'users_to_products'})
Products.belongsToMany(Users, {through: 'users_to_products'})

Cart.belongsTo(Users)
Users.hasMany(Cart)

module.exports = {Users, Sales, Products, Cart}