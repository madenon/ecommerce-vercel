import mongoose from "mongoose";

const addToCartSchema = new mongoose.Schema(
  {
    productId: { type: String, ref: "product", required: true },
    quantity: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const addToCartModel =
  mongoose.models.addToCart || mongoose.model("addToCart", addToCartSchema);
export default addToCartModel;
