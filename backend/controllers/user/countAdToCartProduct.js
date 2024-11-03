import addToCartModel from "../../models/cartProduct.js"

const countAdToCartProduct = async(req, res)=>{
try {
    const userId = req.userId
    const count =  await addToCartModel.countDocuments({
        userId
    })

    res.json({
        data:{
            count
        },
        message:"Ok",
        success:true,
        error:false,

    })
    
} catch (error) {
    res.json({
        message:error.message || error,
        error:true,
        success:false
    })
    
}
}


export {countAdToCartProduct}