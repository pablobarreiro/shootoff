const sequelize = require("sequelize")
const db = require ("../db")

class Users extends sequelize.Model {
}
Users.init({
    nombre: {
        type: sequelize.STRING,
        allownull: false
    },
    email: {
        type: sequelize.STRING,
        validate:{
            isEmail: true
        },   
    },
    passsword: {
        type: sequelize.STRING,
        allownull: false
    },
    salt: {
        type: sequelize.STRING,
    },
    telefono: {
        type: sequelize.INTEGER,
    },
    calle: {
        type: sequelize.STRING
    },
    numero: {
        type: sequelize.INTEGER
    },
    ciudad: {
        type: sequelize.STRING
    },
    codigoPostal: {
        type: sequelize.INTEGER
    },
    pais: {
        type: sequelize.INTEGER
    },
    admin: {
        type: sequelize.BOOLEAN
    },

}, {sequelize:db, modelName:"users"})

module.exports = Users