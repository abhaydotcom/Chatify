import express from "express"
import {Auth} from "../middleware/auth.middleware.js"
import { deleteMessage, getAllUsers, getMessage, sendMessage } from "../controller/message.controller.js";

const router=express.Router();

router.get('/users',Auth,getAllUsers)
router.get('/:id',Auth,getMessage)

router.post('/send/:id',Auth,sendMessage)
router.delete('/delete-msg/:userId',Auth,deleteMessage);
export default router