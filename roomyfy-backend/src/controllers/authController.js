import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER
export const registerUser = async (req,res) => {

try {

const { name,email,password } = req.body;


// Check existing user
const userExists = await User.findOne({ email });

if(userExists){
return res.status(400).json({
message:"User already exists"
});
}


// Hash password
const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(
password,
salt
);


// Create user
const user = await User.create({
name,
email,
password: hashedPassword
});


res.status(201).json({
message:"User registered successfully",
user:{
id:user._id,
name:user.name,
email:user.email
}
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};




// LOGIN
export const loginUser = async(req,res)=>{

try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
return res.status(401).json({
message:"Invalid credentials"
});
}


// Compare passwords
const isMatch = await bcrypt.compare(
password,
user.password
);

if(!isMatch){
return res.status(401).json({
message:"Invalid credentials"
});
}


// Generate token
const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
);


res.status(200).json({
message:"Login successful",
token
});

}catch(error){

res.status(500).json({
message:error.message
});

}

};
// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};