const userModel = require("../model/user");
const bcrypt = require('bcrypt');
exports.register = async (req, res) => {
    try {
        const {fullName, email, age, password, phoneNumber} = req.body
        const existingEmail = await userModel.findOne({email: email.toLowerCase()});
        const existingPhoneNumber = await userModel.findOne({phoneNumber: phoneNumber});
        if(existingEmail || existingPhoneNumber) {
            return res.status(400).json({
                messasge: 'User already exists'
            })
        }
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, saltRound);
        const user = new userModel({
            fullName,
            email,
            password: hashPassword,
            age,
            phoneNumber,
        });
        await user.save()
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


exports.getoneUser = async (req, res) => {
    try {
       const userId = req.params.id;
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({       
                message: 'User not found'
            });
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            data: user
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

