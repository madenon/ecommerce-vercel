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
import { getProductDetails } from "../controllers/product/getProductDetails.js";
import { addToCart } from "../controllers/user/addToCart.js";
import { countAdToCartProduct } from "../controllers/user/countAdToCartProduct.js";
import { addToCartViewProduct } from "../controllers/user/addToCartViewProduct.js";
import { updateAddTotCartProduct } from "../controllers/user/updateAddTotCartProduct.js";
import { deleteAddToCart } from "../controllers/user/deleteAddToCart.js";
import { searchProduct } from "../controllers/product/searchProduct.js";
import { filterProduct } from "../controllers/product/filterProduct.js";
import { paymentController } from "../controllers/order/payemntController.js";
import { webhooks } from "../controllers/order/webhook.js";
import { orderController } from "../controllers/order/orderController.js";

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
router.post("/product-details",  getProductDetails);
router.get("/search",  searchProduct);
router.post("/filter-product",  filterProduct);

// Ajouter au panier
router.post("/addtocart", authToken, addToCart);
router.get("/countAddToCartProduct", authToken, countAdToCartProduct);
router.get("/view-cart-product", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddTotCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCart);
//payment and order 

router.post("/checkout", authToken, paymentController)
router.post("/webhooks", webhooks)
router.get("/order-list", authToken, orderController)



export default router;
