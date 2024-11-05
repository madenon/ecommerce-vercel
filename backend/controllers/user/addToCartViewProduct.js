import addToCartModel from "../../models/cartProduct.js";

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req.userId;
    const allProduct = await addToCartModel.find({
      userId:currentUser,
      
    }).populate("productId");
    res.json({
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
};

export { addToCartViewProduct };
