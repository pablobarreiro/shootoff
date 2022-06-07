const sequelize = require("sequelize")
const db = require ("../db")

class Sales extends sequelize.Model {
}
Sales.init({
    userId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    productId: {
        type: sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: sequelize.INTEGER,
    },
    date: {
        type: sequelize.DATE,
    },
    status: {
        type: sequelize.STRING,
        defaultValue: 'pending'
    },
}, {sequelize:db, modelName:"sales"})

//funcion que genere una date y la guarde en la tabla
Sales.addHook('beforeCreate', (sale)=>{
    const date = new Date()
    sale.date = date
})


module.exports = Sales