import { stripe } from "../../config/stripe.js";
import userModel from "../../models/userModel.js";

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;
    const user = await userModel.findOne({ _id: request.userId });
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      customer_email: user.email,
      metadata: {
        userId: request.userId,
      },

      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage,
              metadata: {
                productId: item.productId._id
              },
              
            },
            unit_amount: item.productId.sellingPrice * 100 
          },
          
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        
        };
      }),
      success_url: `${process.env.FROND_URL}/success`,
      cancel_url: `${process.env.FROND_URL}/cancel`,
    };
    const session = await stripe.checkout.sessions.create(params);
    response.status(303).json(session);
  } catch (error) {
    response.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


//  order cahs 

const placerOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "CASH", //COD
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Commande passée" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { paymentController, placerOrder };
