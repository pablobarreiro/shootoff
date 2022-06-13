const sequelize = require("sequelize")
const db = require ("../db")

class Products extends sequelize.Model {
}
Products.init({
    product_name: {
        type: sequelize.STRING,
        allowNull: false
    },
    description: {
        type: sequelize.TEXT,
    },
    price: {
        type: sequelize.FLOAT,
        allowNull: false
    },
    category: {
        type: sequelize.STRING,
        defaultValue: 'Uncategory'
    },
    stock: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    vote: {
        type: sequelize.FLOAT,
    },
    coments: {
        type: sequelize.ARRAY(sequelize.TEXT),
        defaultValue: [],
    },
    vote_count: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    img_url: {
        type: sequelize.STRING
    }
}, {sequelize:db, modelName:"products"})


module.exports = Products