const sequelize = require("sequelize")
const db = require ("../db")

class Cart extends sequelize.Model {
}
Cart.init({
    productId: {
        type: sequelize.STRING,
    },
    userId: {
        type: sequelize.INTEGER,
    },
    cantidad: {
        type: sequelize.INTEGER,
    },
}, {sequelize:db, modelName:"products"})


module.exports = Cart