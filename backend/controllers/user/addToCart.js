import addToCartModel from "../../models/cartProduct.js";

const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const currentUser = req.userId;


    const isProductAvalable = await addToCartModel.findOne({productId})
    if(isProductAvalable){
      return res.json({
        message:"Votre article existe déjà dans panier",
        success:false,
        error:true
      })
    }


    const payload = {
      productId:productId,
      quantity:1,
      userId:currentUser,
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save()

    return res.json({
      data:saveProduct,
      message:"Produit ajouté avec succès",
      error:false,
      success:true
    })

  } catch (error) {
    res.json({
      message:error?.message || error,
      error:true,
      success:false
    })
  }
};

export { addToCart };
