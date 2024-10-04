
const User=require('../Model/userSchema');
require('dotenv').config()
const adminEmail=process.env.adminEmail
const adminPassword=process.env.adminPassword
const jwt =require('jsonwebtoken')



const generateToken = (userId) => {
  return jwt.sign({ userId }, 'secret');
};


const  listUsers= async (req,res)=>{
    try{
        const users=await User.find()
        res.json({userData:users})
    }catch(err){
        console.log(err);
    }
}

const deleteUser= async (req,res)=>{
    try{
        const {userId}=req.body
        await User.deleteOne({_id:userId})
        res.json({message:true})
    }catch(err){
        console.log(err);
    }
}

const editUser = async (req, res) => {
    try {
      const { name, email, userId } = req.body;

      const existingUser = await User.findOne({ email, _id: { $ne: userId } });
      if (existingUser) {
        return res.json({ aleady: 'Email already exists' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.json({ aleady: 'User not found' });
      }

      user.name = name;
      user.email = email;
      await user.save();

      res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  const login=(req,res)=>{
    try{
      const {email,password}=req.body
      if(email==adminEmail){
        if(password==adminPassword){
          const token=generateToken()
          res.json({success:'true',adminEmail,adminPassword,token})
        }else{
          res.json({message:'Password Not Match'})
        }
      }else{
        res.json({message:'Email Not Match'})
      }

    }catch(err){
      console.log(err);
      res.status(500).json({ message: 'Server error' });

    }
  }

module.exports={
    listUsers,
    deleteUser,
    editUser,
    login
}