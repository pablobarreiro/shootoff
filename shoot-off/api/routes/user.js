const express = require("express") ;
const userRouter = express.Router() ;
const { Users } = require("../models")
const passport = require("passport");


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
        return res.sendStatus(404);
    }else{ 
        res.send(req.user)
    }

})

userRouter.put("/me/:id" , (req, res) => {
   
    Users.update(req.body, {
       where: {
           id: req.params.id
       },
       returning: true,
       plain: true
   }).then( result => {
    const user = result[1]
    res.json({
        messege: "upadted successfully",
        user,
    })
   })
   .catch(() => res.sendStatus(500))
})

userRouter.get("/admin/users", (req, res) => {
    if(Users.admin === false){
        res.sendStatus(401)
    }else{
        Users.findAll().then((users) => res.json(users))
    }
})

userRouter.delete("/admin/:id", (req, res) => {
    if(Users.admin === false){
        res.sendStatus(401)
    }else{
        Users.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(res.sendStatus(204))
        .catch(err =>  console.log(err))
    }
    
})

userRouter.put("/admin/add/:id", (req, res) => {
    if(Users.admin === false){
        res.sendStatus(401)
    }else{
        Users.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if(Users.admin === false){
            Users.admin === true
        }
    }
})



module.exports = userRouter ;

