import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUserProfile, userDetails } from "../controllers/authController.js";
import { isAuth } from "../helpers/authMiddleware.js";

const router = Router()

router.post("/register",registerUser)
    .post("/login",loginUser)
    .get("/logout",logoutUser)
    .patch("/update/:uid",isAuth,updateUserProfile)
    .post("/me",isAuth,userDetails)


export default router;