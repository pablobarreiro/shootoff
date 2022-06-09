const sequelize = require("sequelize")
const db = require ("../db")

class Sales extends sequelize.Model {
}
Sales.init({
    user_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    product_id: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    order_number: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    status: {
        type: sequelize.STRING,
        defaultValue: 'pending'
    },
}, {sequelize:db, modelName:"sales"})


module.exports = Sales