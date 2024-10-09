const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false, 
                message: `${email} signup first!`
            });
        }

        // Password comparison
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Wrong password!'
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };

        // Generate token
        if(await isPasswordValid ) {
            //password match
            let token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

        // Set user token and remove password
        user = user.toObject();
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3000), // 3 days
            httpOnly: true,
        };

        // Send cookie and response
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,  
            message: "User logged in successfully!"
        });
        // res.status(200).json({
        //     success: true,
        //     token,
        //     user,  
        //     message: "User logged in successfully!"
        // });
        }
    } 
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'User can\'t log in!'
        }); 
    }
};