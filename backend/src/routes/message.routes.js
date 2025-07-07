import express from 'express';
import { checkProtect } from '../middleware/auth.checkProtect.js';
import { getMessage, getUserForSidebar, sendMessage } from '../controller/message.controller.js';
const router = express.Router();
router.get('/user' , checkProtect , getUserForSidebar);
router.post('/send/:id' , checkProtect , sendMessage);
router.get('/:id' , checkProtect , getMessage);
export default router;