const express=require('express')
const adminRouter=express()
const adminController=require('../Controller/adminController')


adminRouter.post('/allusers',adminController.listUsers)
adminRouter.post('/deleteUser',adminController.deleteUser)
adminRouter.post('/edituser',adminController.editUser)
adminRouter.post('/adminlogin',adminController.login)
module.exports=adminRouter