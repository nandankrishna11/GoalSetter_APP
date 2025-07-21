const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler= require('express-async-handler')
const User=require('../model/userModel')
 
//register user
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('please add all fields')
    }

    if(password.length < 6){
        res.status(400)
        throw new Error('Password must be at least 6 characters')
    }

    //check user exist
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('user already exist')
    }

    // hash password

    const salt =await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password,salt)

    //create user
    const user =await User.create({
        name,
        email,
        password:hashedPassword
    })
    if(user){
    res.status(201).json({
        _id :user.id,
        name: user.name,
        email:user.email,
        token:generateToken(user._id)
    })
    }
    else{
       res.status(400)
       throw new Error('invalid user data') 
    } 
})

//authenticate user
const loginUser=asyncHandler(async(req,res)=>{
   
    const {email,password}=req.body

    //check for email
    const user=await User.findOne({email})

    //check for password
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({ 
        _id :user.id,
        name: user.name,
        email:user.email,
         token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('invalid email or password')
}
})

//get user data

const userData=asyncHandler(async(req,res)=>{
   res.status(200).json(req.user)
    
})

//generate a token

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d',
        })
}

module.exports={registerUser,loginUser,userData}