const userModel = require("../model/user");
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
        const {fullName, email,age, password, phoneNumber} = req.body
        const existingEmail = await userModel.findOne({email: email.toLowerCase()});
        const existingPhoneNumber = await userModel.findOne({phoneNumber: phoneNumber});
        if(existingEmail || existingPhoneNumber) {
            return res.status(404).json({
                messasge: 'User already exists'
            })
        }
        const saltRound = await bcrypt.genSalt(10);
        console.log('salt rounds:', saltRound);
        
        const hashPassword = await bcrypt.hash(password, saltRound)
        console.log('Hash password:', hashPassword);
        
        const user = new userModel({
            fullName,
            email,
            password: hashPassword,
            age,
            phoneNumber,
        })
        res.status(201).json({
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
};


