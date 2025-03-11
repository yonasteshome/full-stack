const registerController=require('../controllers/registerController')
const express=require('express')
const protected=require('../middleWares/authMiddleWare')
const router=express.Router()
router.post('/signup',registerController.setData)
router.post('/login',registerController.login)
router.get('/hidden',protected,registerController.hidden)


module.exports=router