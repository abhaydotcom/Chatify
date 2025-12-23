import express from "express"
import { checkAuth, login, logout, Signup, updateProfile, verification } from "../controller/user.controller.js";
import {Auth} from '../middleware/auth.middleware.js'
 const router=express.Router();

router.post('/signup',Signup)
router.post('/login',login)
router.post('/logout',logout)   
router.post('/verify',verification)   
router.get('/check-auth',Auth,checkAuth)
router.put('/update-profile',Auth,updateProfile)

export default router
