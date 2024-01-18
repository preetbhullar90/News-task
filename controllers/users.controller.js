const { fetchAllUsers} = require('../models/users.model');

exports.getAllUsers = (req, res, next) => {

    fetchAllUsers() 
        .then((user) => {
            res.status(200).send({user})
        })
        .catch((err) => {
        next(err)
    })
    
}