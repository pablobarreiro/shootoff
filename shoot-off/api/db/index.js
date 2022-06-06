const sequelize = require("sequelize")

const db = new sequelize ("shootoff", null, null, {
    host: "localhost", dialect:"postgres"
})

module.exports = db