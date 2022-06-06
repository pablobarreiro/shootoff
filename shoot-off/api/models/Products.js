const sequelize = require("sequelize")
const db = require ("../db")

class Products extends sequelize.Model {
}
Products.init({
    nombre: {
        type: sequelize.STRING,
    },
    descripcion: {
        type: sequelize.TEXT,
    },
    precio: {
        type: sequelize.INTEGER,
    },
    categoria: {
        type: sequelize.STRING,
    },
    stock: {
        type: sequelize.INTEGER,
    },
    valoracion: {
        type: sequelize.FLOAT,
    },
    comentarios: {
        type: sequelize.TEXT,
    },
    nroDeVotos: {
        type: sequelize.INTEGER,
    },
}, {sequelize:db, modelName:"products"})


module.exports = Products