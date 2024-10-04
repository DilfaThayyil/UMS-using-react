const express=require('express')
const userRouter=express()
const userController=require('../Controller/userController')
const multer=require('multer')
const path=require('path')
const jwt=require('jsonwebtoken')
const SECRET_KEY = 'your_jwt_secret';
userRouter.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,path.resolve(__dirname, '..','../client/public/uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });



  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ message: 'No token provided' });
    console.log(token);
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(502).json({ message: 'Failed to authenticate token' });

      req.userId = decoded.id;
      next();
    });
  };

userRouter.post('/login',userController.logIn)
userRouter.post('/signup',userController.register)
userRouter.post('/upload',upload.single('profileImage'),userController.uploadImage);
userRouter.post('/checkingUpdate',userController.checkingUser)


module.exports=userRouter