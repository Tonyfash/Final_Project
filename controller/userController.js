const userModel = require("../model/user");
const bcrypt = require('bcrypt');
const cloudinary = require('../config/cloudinary')
const fs = require('fs');

exports.register = async (req, res) => {
    try {
        const {fullName, email, age, password, phoneNumber} = req.body
        const file = req.file;
        let response;
        const existingEmail = await userModel.findOne({email: email.toLowerCase()});
        const existingPhoneNumber = await userModel.findOne({phoneNumber: phoneNumber});
        
        if(existingEmail || existingPhoneNumber) {
             fs.unlinkSync(file.path)
            return res.status(400).json({
                messasge: 'User already exists'
            })
        }
        if (file && file.path) {
           response = await cloudinary.uploader.upload(file.path);
            fs.unlinkSync(file.path)
            }
        
        const saltRound = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, saltRound);

        const user = new userModel({
            fullName,
            email,
            password: hashPassword,
            age,
            phoneNumber,
            profiePicture: {
                publicId: response.public_id,
                imageUrl: response.secure_url
            }
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


