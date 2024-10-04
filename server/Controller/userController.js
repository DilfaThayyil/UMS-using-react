const User=require('../Model/userSchema')
const jwt=require('jsonwebtoken')
const secret = 'your_jwt_secret';


const generateToken = (userId) => {
    return jwt.sign({ userId }, secret, { expiresIn: '1h' });
  };

const logIn= async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user){
            res.json({notMatch:'User Not Found'})
        }
        if(user.password===password){
            const token= generateToken()

            res.json({success:'login completed',user,token:token})
        }else{
            res.json({notMatch:"Password Not Match"})
        }

    }catch(err){
        console.log(err);
    }
}


const register= async (req,res)=>{
    try{
        const {name,email,password}=req.body
        const already = await User.findOne({email:email})
        if(already){
            res.json({error:"Email already exisit"})
        }else{
            const newuser=new User({
                name,
                email,
                password
            })
            await newuser.save()
            res.json({message:"Account Created",user:newuser})
        }

    }catch(err){
        console.log(err);
    }
}



  const uploadImage = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const { email, name } = req.body;
    const profileImage = `${req.file.filename}`;
    try {
      let user = await User.findOne({ email:'shibil@gmail.com' });

      if (user) {
       user.profileImage = profileImage;
      }

      await user.save();
      res.json({ profileImage: profileImage });
        } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }

  const checkingUser=async (req,res)=>{
    try{
        const {email}=req.body.user.user
        const user=await User.findOne({email:email})
      if(user){

          res.json({user})
      }else{
        res.json({message:'nouser'})
      }
    }catch(err){
        console.log(err);
    }
  }




module.exports={
    logIn,
    register,
    uploadImage,
    checkingUser
}