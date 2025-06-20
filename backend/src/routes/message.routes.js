import express from 'express';
import { checkProtect } from '../middleware/auth.checkProtect.js';
import { getMessage, getUserForSidebar } from '../controller/message.controller.js';
const router = express.Router();
router.get('/user' , checkProtect , getUserForSidebar);
router.get('/:id' , checkProtect , getMessage);
export default router;