const bcrypt = require("bcrypt");
const User = require("../models/User");

//singnup route handler

exports.signup = async(req,res)=>{
    try{
        //get data
        const {name,email,password,role}=req.body;
        //check if user alreadu exist..
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User Already Exist!!!'
            });
        }
        //secure password:
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password ;('
            })
        }
        //create entry dor user
       const user = await User.create({
        name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:'User Created Successfully ;)'
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cant be registerd!'
        })
    }
}

