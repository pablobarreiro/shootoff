const sequelize = require("sequelize")
const db = require ("../db")
const bcrypt = require ('bcrypt')

class Users extends sequelize.Model {
    hashPassword(password,salt) {
        return bcrypt.hashSync(password, salt)
    }

    validatePassword(password) {
        return this.password === this.hashPassword(password,this.salt)
    }
}

Users.init({
    user_name: {
        type: sequelize.STRING,
        allownull: false
    },
    email: {
        type: sequelize.STRING,
        unique: true,
        validate:{
            isEmail: true
        },   
    },
    password: {
        type: sequelize.STRING,
        allownull: false
    },
    salt: {
        type: sequelize.STRING,
    },
    phone: {
        type: sequelize.INTEGER,
    },
    street: {
        type: sequelize.STRING
    },
    street_number: {
        type: sequelize.INTEGER
    },
    city: {
        type: sequelize.STRING
    },
    postal_code: {
        type: sequelize.INTEGER
    },
    country: {
        type: sequelize.STRING
    },
    admin: {
        type: sequelize.BOOLEAN,
        default: false
    },
    employee: {
        type: sequelize.BOOLEAN,
        default: false
    }

}, {sequelize:db, modelName:"users"})

Users.addHook('beforeCreate',(user)=>{
    if(!user.password.length) {
        user.password = null
        return
    }
    return bcrypt.genSalt(8).then((cryptedSalt)=>{
        user.salt = cryptedSalt
        user.password = user.hashPassword(user.password,user.salt)
    })
    .catch(err=>console.log(err))
    })

module.exports = Users