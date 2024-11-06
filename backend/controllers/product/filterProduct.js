import productModel from "../../models/productModel.js"

const filterProduct = async(req, res) =>{

    try {

        const categoryList = req.body?.category  || []
        const product = await productModel.find({
            category: {
                "$in":categoryList
            }
        })

        res.json({
            data:product,
            message:"product",
            error:false,
            success:true
        })
        
    } catch (error) {
        res.json({
            message: error.message || error, 
            success:false, 
            error:true
        })
        
    }

}



export {filterProduct}