import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: "others",
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
    enum: ["debit", "credit"],
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},{
  timestamps: true,
});

const Transaction = model("Transaction", transactionSchema);

export default Transaction;