import { uploadProductPremission } from "../../helpers/premission.js";
import productModel from "../../models/productModel.js";

const uploadProduct = async (req, res) => {
  try {
    const sessionUserId = req.userId;
    if (!uploadProductPremission(sessionUserId)) {
      throw new Error("Vous n'avez pas  la permission");
    }
    const uploadProduct = new productModel(req.body);
    const saveProduct = await uploadProduct.save();
    res.status(201).json({
      message: "Le produit a bien été créer",
      error: false,
      success: true,
      data: saveProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { uploadProduct };
