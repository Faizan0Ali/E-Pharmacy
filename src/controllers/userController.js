const userModel = require("../models/userModel");


const createUser = async (req,res) => {
    try {
        let data = req.body
        let {fname, lname, email, phone, password, address} = data



        const created = userModel.create(data)
        return res.status(201).send({status: true, message: "sucessfully created", data: data})
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }

}

module.exports = {createUser}