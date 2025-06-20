import express from 'express';
import { signup,login,logout, profileUpdate, checkAuth } from '../controller/auth.contoller.js';
import { checkProtect } from '../middleware/auth.checkProtect.js';
const router = express.Router();
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/profile-update",checkProtect,profileUpdate)
router.get("/check",checkProtect, checkAuth)
export default router;