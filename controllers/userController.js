import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
//@desc Register a user
//@route POST /api/users/register
//@access public

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  //do we have a existing user
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }

  //hash password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashed Password ", hashPassword);
  //create a new User
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  //passing information to user
  if (user) {
    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } else {
   res.status(400);
    throw new Error("user data is not valid");
  }
  console.log(`user created ${user}`);

 
});

//@desc login user
//@route POST /api/users/login
//@access public

export const loginUser = asyncHandler(async (req, res) => {
  
    const{email,password} = req.body;
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandatory");
    }
    //to identify user is already present in db or not
    const user= await User.findOne({email})
    
    //compare password with hashedpassword
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
        //payload
        user:{
          username: user.username,
          email:user.email,
          id: user.id,
        }
        },process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "10m"})
      res.status(200).json({accessToken})
    }else{
      res.status(401)
      throw new Error("email or password is not valid");
    }
    
});

//@desc current user info
//@route GET /api/users/current
//@access private

export const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
