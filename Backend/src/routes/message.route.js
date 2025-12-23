import express from "express"
import {Auth} from "../middleware/auth.middleware.js"
import { getAllUsers, getMessage, sendMessage } from "../controller/message.controller.js";

const router=express.Router();

router.get('/users',Auth,getAllUsers)
router.get('/:id',Auth,getMessage)

router.post('/send/:id',Auth,sendMessage)

export default router