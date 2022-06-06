const sequelize = require("sequelize")
const db = require ("../db")

class Sales extends sequelize.Model {
}
Sales.init({
    userId: {
        type: sequelize.INTEGER,
    },
    productId: {
        type: sequelize.INTEGER,
    },
    cantidad: {
        type: sequelize.INTEGER,
    },
    fecha: {
        type: sequelize.DATE,
    },
    cantidad: {
        type: sequelize.FLOAT,
    },
    estado: {
        type: sequelize.STRING
    },
}, {sequelize:db, modelName:"sales"})


module.exports = Sales