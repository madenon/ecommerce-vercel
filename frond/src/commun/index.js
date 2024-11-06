const backendDomain = process.env.REACT_APP_BACKEND_URL 

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn:{
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user:{
    url: `${backendDomain}/api/user-details`,
    method: "get"
  },
  logout_user:{
    url: `${backendDomain}/api/logout`,
    method: "get"
  },
  allUser:{
    url: `${backendDomain}/api/all-users`,
    method: "get"
  },
  apdateUser:{
    url: `${backendDomain}/api/update-user`,
    method: "post"
  },
  uploadProdut:{
    url: `${backendDomain}/api/upload-product`,
    method: "post"
  },
  allProduct:{
    url: `${backendDomain}/api/get-product`,
    method: "get"
  },
  editProduct:{
    url: `${backendDomain}/api/update-product`,
    method: "post"
  },
  
  getAllProduct:{
    url: `${backendDomain}/api/get-category-product`,
    method: "get"
  },
  CategoryWiseProduct:{
    url: `${backendDomain}/api/category-product`,
    method: "post"
  },
  productDetails:{
    url: `${backendDomain}/api/product-details`,
    method: "post"
  },
  addToCartProduct:{
    url: `${backendDomain}/api/addtocart`,
    method: "post"
  },
  addToCartCount:{
    url: `${backendDomain}/api/countAddToCartProduct`,
    method: "get"
  },
  addToCartProductView:{
    url: `${backendDomain}/api/view-cart-product`,
    method: "get"
  },
  updateToCartProduct:{
    url: `${backendDomain}/api/update-cart-product`,
    method: "post"
  },
  deleteCartProduct:{
    url: `${backendDomain}/api/delete-cart-product`,
    method: "post"
  },
  searchProduct:{
    url: `${backendDomain}/api/search`,
    method: "get"
  },
  filterProduct:{
    url: `${backendDomain}/api/filter-product`,
    method: "post"
  }
  
};

export default SummaryApi;
