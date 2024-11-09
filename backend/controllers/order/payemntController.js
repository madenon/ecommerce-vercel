import {stripe} from "../../config/stripe.js";
import userModel from "../../models/userModel.js";

const  paymentController = async(request, response)=>{
 try {
    const {cartItems} = request.body
    const user  = await userModel.findOne({_id:requestuserId})
      const params ={
        submit_type:"pay",
        payment_method_types:['card'],
        billing_address_colection:'auto',
        shipping_option:[
            {
                shipping_rate:'shr_1QJHjCFd8eDpsVKRypAsfods'
            }
        ],
        customer_email:user.email,
        line_items:cartItems.map((item,index)=>{
            return{
                price_data:{
                    currency:"eur",
                    product_data:{
                        
                    }
                }
            }
        })

      }
    const session = await stripe.checkout.sessions.create(params)
     
    response.status(303).json(session)


 } catch (error) {

    response.json({
        message: error.message || error, 
        success:false, 
        error:true
    })
    
 }
}




export {paymentController}

