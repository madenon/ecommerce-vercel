import productModel from "../../models/productModel.js";

const getCategoryWiseProduct = async (req, res) => {
  try {
    const { category } = req?.body || req?.query;
    const product = await productModel.find({ category });
     res.json({
        data:product,
        message:"Produits",
        success: true,
        error: false,
     })

} catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { getCategoryWiseProduct };
