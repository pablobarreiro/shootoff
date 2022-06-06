const express =require ("express")
const app=express()
const db = require("./db")
const models = require("./models")


app.use(express.json())

db.sync({
    force:true
}).then(() => {
    app.listen(3001,()=>{
        console.log("servidor escuchando en el puerto 3001")
    })
})