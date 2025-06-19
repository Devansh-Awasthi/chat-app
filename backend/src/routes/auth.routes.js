import express from 'express';
import { signup,login,logout, profileUpdate } from '../controller/auth.contoller.js';
const router = express.Router();
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/profile-update",checkProtect,profileUpdate)
export default router;