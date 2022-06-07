const sequelize = require("sequelize")
const db = require ("../db")

class Cart extends sequelize.Model {
}
Cart.init({
    productId: {
        type: sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
    },
}, {sequelize:db, modelName:"carts"})


module.exports = Cart