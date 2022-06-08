const express =require ("express")
const app=express()
const db = require("./db")
const {Users,Products,Sales,Cart} = require("./models")
const expressSession = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const cookieParser = require('cookie-parser')

const router = require("./routes")


app.use(express.json())

// PASSPORT
// cookies
app.use(cookieParser())
app.use(expressSession({ secret: "e-comerce" }))

// passport init
app.use(passport.initialize());
app.use(passport.session())

// estrategia local
passport.use(new LocalStrategy({usernameField:'email'}, (email,password,done) => {
  Users.findOne({where:{email:email.toLowerCase()}})
  .then(user=>{
    if (!user) done(null,false)
    if (user.validatePassword(password)) done(null,user)
    else done (null, false)
  })
  .catch(err => done(err,false))
}))

// serialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
// deserialize
passport.deserializeUser(function(id, done) {
Users.findByPk(id)
    .then(user => done(null, user))
});


app.use("/api",router)



db.sync({
    force: false
}).then(() => {
    app.listen(3001,()=>{
        console.log("servidor escuchando en el puerto 3001")
    })
})