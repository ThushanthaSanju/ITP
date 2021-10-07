import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    count: { type: Number, required: true },
    amount: { type: Number, required: true },
    expireDate: { type: Date, required: true },
    createDate: { type: Date, default: Date.now() },
    usageCount: { type: Number, default: 0 },
    isValid: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
