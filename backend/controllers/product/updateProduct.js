import { uploadProductPremission } from "../../helpers/premission.js";
import productModel from "../../models/productModel.js";

const editProduct = async (req, res) => {
  try {
    if (!uploadProductPremission(req.userId)) {
      throw new Error("Vous n'avez pas  la permission");
    }
    const { _id, ...resBody } = req.body;
    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody);

    res.status(201).json({
      message: "Le produit a bien été modifé",
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { editProduct };
