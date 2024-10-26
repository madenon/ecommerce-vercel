import productModel from "../../models/productModel.js";

const getProduct = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });
    res.json({
      message: "Tout les produits",
      success: true,
      error: false,
      data: allProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { getProduct };
