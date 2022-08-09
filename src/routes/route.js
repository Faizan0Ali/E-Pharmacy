const express = require('express');
const router = express.Router();

const {createUser}= require('../controllers/userController')


//APIS for user
router.post("/register", createUser);


//API for wrong route-Of-API
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you request is not available"
    })
})//awesome



module.exports=router;