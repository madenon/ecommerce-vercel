const orderController = (request, response)=>{
    try {
        
    } catch (error) {
        response.status(500).json({
            message:error.message||error,
            success:false,
            error:true
        })
        
    }
}
export  {orderController}