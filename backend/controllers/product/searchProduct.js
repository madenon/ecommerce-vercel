import productModel from "../../models/productModel.js";

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i", "g");
    const product = await productModel.find({
      $or: [
        {
          brandName: regex,
        },

        {
          category: regex,
        },
      ],
    });
    res.json({
      data: product,
      message: "Liste de vos recheches",
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export { searchProduct };
