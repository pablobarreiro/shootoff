const sequelize = require("sequelize")
const db = require ("../db")

class Cart extends sequelize.Model {
}
Cart.init({
    product_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {sequelize:db, modelName:"carts"})


module.exports = Cart