const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const Users = require("./user-model.js");
const restricted = require("../auth/auth-middleware.js");

router.get("/", restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users, jwt: req.jwt });
        }) .catch(err => res.send(err));
});

router.get("/:userId", restricted, (req, res) => {
    Users.findById(req.jwt.userId)
    .then(user => {
        if(!user){
            res.status(404).json({ message: "Can't find user with provided id." })
        } else{
            res.status(200).json({ user })
        }
    }) .catch(error => {
        console.log("ERROR", error)
        res.status(500).json({ error: "Unable to fetch user at this time." })
    })
});

router.put("/:id", restricted, (req, res) => {
    const updates = req.body;
    if(req.body.password){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(updates.password, rounds);
        updates.password = hash
    }
    Users.update(req.params.id, updates)
    .then(user => {
        if(!user){
            res.status(404).json({ message: "Can't find user with provided id." })
        } else{
            delete user.password;
            res.status(200).json(user)
        }
    }) .catch(error => {
        console.log("ERROR", error)
        res.status(500).json({ error: "Unable to edit user info at this time." })
})
})

module.exports = router;