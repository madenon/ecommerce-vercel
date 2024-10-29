import express from "express";
import { authToken } from "../middleware/authToken.js";
import {  userLoogout } from "../controllers/user/userLogout.js";
import { userDteails } from "../controllers/user/userDetails.js";
import { userSignin } from "../controllers/user/userSign.js";
import { userSignup } from "../controllers/user/userSignUp.js";
import { allUsers } from "../controllers/user/allUsers.js";
import { getProduct } from "../controllers/product/getProduct.js";
import { editProduct } from "../controllers/product/updateProduct.js";
import { uploadProduct } from "../controllers/product/uploadProduct.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { getCategoryProduct } from "../controllers/product/getCategoryProductOne.js";
import { getCategoryWiseProduct } from "../controllers/product/getCategoryWiseProduct.js";

const router = express.Router();
router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/logout", userLoogout);
router.get("/user-details", authToken, userDteails);

//Admin
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// products
router.post("/upload-product", authToken, uploadProduct);
router.get("/get-product", getProduct);
router.post("/update-product", authToken, editProduct);
router.get("/get-category-product",  getCategoryProduct);
router.post("/category-product",  getCategoryWiseProduct);

export default router;
