import express from 'express';
import { checkProtect } from '../middleware/auth.checkProtect.js';
import { getMessage, getUserForSidebar, sendMessage } from '../controller/message.controller.js';
const router = express.Router();
router.get('/user' , checkProtect , getUserForSidebar);
router.get('/:id' , checkProtect , getMessage);
router.post('/send/:id' , checkProtect , sendMessage);
export default router;