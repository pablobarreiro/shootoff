const express = require("express") ;
const userRouter = express.Router() ;
const { Users} = require("../models")
const passport = require("passport")


userRouter.post("/register", (req, res) => {
    Users.create(req.body).then((user) => res.status(201).send(user))
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(req.user)
});

userRouter.post("/logout", (req, res) => {
    req.logOut();
    res.sendStatus(200);
})

userRouter.get("/me", (req, res) => {
    if(!req.user){
        return res.sendStatus(401);
    }
})





module.exports = userRouter ;
