import express from "express";
import { userSignup } from "../controllers/userSignUp.js";
import { userSignin } from "../controllers/userSign.js";
import { userDteails } from "../controllers/userDetails.js";
import { authToken } from "../middleware/authToken.js";
import { logout } from "../controllers/userLogout.js";
import { allUsers } from "../controllers/allUsers.js";

const router = express.Router()
router.post("/signup", userSignup)
router.post("/signin", userSignin)
router.get("/logout", logout)
router.get("/user-details", authToken, userDteails)

//Admin 
router.get("/all-users", authToken, allUsers)

export  default router