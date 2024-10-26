import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    category: { type: String, required: true },
    productImage: { type: Array},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
