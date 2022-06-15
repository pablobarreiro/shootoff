const express = require("express") ;
const userRouter = express.Router() ;

const { Users, Products } = require("../models")
const passport = require("passport");
const { findOrCreate } = require("../models/Users");


//-- rutas register, log y perfil -- // 
userRouter.post("/register", (req, res) => {
    Users.create(req.body).then((user) => res.status(201).send(user))
});

userRouter.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(req.user)
});

userRouter.post("/logout", (req, res, next) => {
    req.logOut(function(err) {
        if(err) {return next(err)}
    });
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
   }).then(result => {
    const user = result[1]
    res.json({
        messege: "upadted successfully",
        user,
    })
   })
   .catch(() => res.sendStatus(500))
})


//-- rutas del admin -- // 
userRouter.get("/admin/:adminId/users", (req, res) => {
    Users.findByPk(req.params.adminId)
        .then((user) => {
            if(user.admin === true){
                Users.findAll({ order: [
                    ["id", "ASC"]
                ]})
                   .then((users) => res.status(200).json(users))
           }else{
              res.sendStatus(401)
           }
        })
        .catch(err => console.log(err))
})

userRouter.delete("/admin/:adminId/deleteUser/:id", (req, res) => {
    Users.findByPk(req.params.adminId)
        .then((user) => {
            if(user.admin === true){
                Users.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                res.sendStatus(204)
            }else{
                res.sendStatus(401)
            }
        })
        .catch(err =>  console.log(err))
})

userRouter.put("/admin/:adminId/changeRol/:id", (req, res) => {
    Users.findByPk(req.params.adminId)
        .then((user) => {
            if(user.admin === true && req.params.adminId !== req.params.id){
            Users.findByPk(req.params.id)
                .then(newEmployee => {
                    newEmployee.update({
                        employee: !newEmployee.employee
                        
                    })
                })
                res.sendStatus(204)
            }else if(req.params.adminId === req.params.id){
                res.send("cant change yourself rol")
            }
        })
        .catch(() =>  res.sendStatus(500))
})


module.exports = userRouter ;

