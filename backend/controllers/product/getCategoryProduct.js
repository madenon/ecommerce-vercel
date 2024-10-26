import productModel from "../../models/productModel.js";

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");
    // les categorie du produit , tableau
    const productByCategory = [];

    for (const category of productCategory) {
      const product = await productModel.findOne({category});
      if (product) {
        productByCategory.push(product);
      }
    }

    res.json({ message: "Catégorie produit",
        data:productByCategory,
         success: true, 
         error: false });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export { getCategoryProduct };
