import { Router } from "express";
import {signupValidation,loginValidation,forgotPasswordValidation } from "../Middlewares/AuthValidation.js";
import {signup,login,forgetpassword} from "../Controllers/AuthController.js";

const router=Router();

router.post("/login",loginValidation,login)
router.post("/signup",signupValidation,signup)
router.post("/forgot-password", forgotPasswordValidation, forgetpassword);


export default router;