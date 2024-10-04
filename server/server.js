require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const port=process.env.PORT||3000
const mongoose=require('mongoose')
const userRouter=require('./Router/userRouter')
const adminRouter=require('./Router/adminRouter')

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  }))


  mongoose.connect(process.env.mongodbConnectionURL).then(()=>{
    console.log('DATABSE CONNECTED');
  }).catch(()=>{
    console.log('DATABSE NOT CONNECTED!!!!!!!!!');
  })

  app.use(express.json())

 app.use('/api',userRouter)
 app.use('/admin',adminRouter)

app.listen(port,()=>{
    console.log(`Server is running on Port ${port}`);
})