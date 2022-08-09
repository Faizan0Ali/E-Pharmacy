const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')


const createUser = async (req,res) => {
    try {
        let data = req.body
        let {fname, lname, email, phone, password, address} = data


        const create = userModel.create(data)
        return res.status(201).send({status: true, message: "sucessfully created", data: data})
        
    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }

}

const userLogin = async (req,res) => {
    try {
        let data = req.body
        let { email, password } = data

    
        //-----------Mandatory_Fields-----------\\
        if(Object.keys(data).length == 0)return res.status(400).send({status:false, message: "Please Enter Details Can't Be Empty"})
        if (!email || !password) return res.status(400).send({ status: false, message: "Email Id And Password is mandatory" })
      
        //-----------Validation_Fields-----------\\
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Please provide The Email-id. 🛑❌" });
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "Please provide The password. 🛑❌" });;
        }
        //-----------Duplication_Fields-----------\\
        let userEmail = await userModel.findOne({ email: email });
        if(!userEmail) return res.status(404).send({status: false, message: "No User Exist"})

        const generatedToken = jwt.sign({
            userId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 15
        }, 'E-pharmacy')
        res.setHeader('Authorization', 'Bearer ' + generatedToken)
        return res.status(200).send({
            "status": true,
            message: "User login successfull",                      //" user loggedIn Succesfully ✔🟢"
            data: {
                userId: user._id,
                token: generatedToken,
            }
        });

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}


module.exports = {createUser}