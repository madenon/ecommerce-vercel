import addToCartModel from "../../models/cartProduct.js"

const deleteAddToCart = async(req, res) =>{
try {
    const currentUserId = req.userId
    const addToCartProdct = req.body._id

    const deleteProduct = await addToCartModel.deleteOne({_id:addToCartProdct})
    res.json({
        message:"Article a bien été supprimé du panier",
        error:false, 
        success:true,
        data:deleteProduct
    })
    
} catch (error) {
    res.json({
        message: error.message|| error,
        success:false,
        error:true

    })
    
}
}


export {deleteAddToCart}