import addToCartModel from "../../models/cartProduct.js";

const updateAddTotCartProduct = async(req, res)=>{
    try {
        const currentUserId = req.userId;
        const addToCartProductId  = req?.body?._id;

        const qty = req.body.quantity;
        const updateProduct = await  addToCartModel.updateOne({_id:addToCartProductId},{
            ...(qty && {quantity:qty})
        })
        res.json({
            message:"Quantité mise à jour",
            data:updateProduct,
            error:false,
            success:true
        })
        
    } catch (error) {
        res.json({
            message: error?.message ||error,
            error:true,
            success:false
        })
        
    }
}


export {updateAddTotCartProduct}