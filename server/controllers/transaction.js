import Transaction from '../models/Transaction.js'
import User from '../models/User.js';

const postTransaction = async (req, res) => {
  const { title, amount, category, description, type, user } = req.body;

  if (!(title && amount && type && user)) {
    return res.json({
        success: false,
        message: "All fields are required",
        data: null
    })
}

  const transaction = new Transaction({ title, amount, category, description, type, user });

  try {
    const savedTransaction = await transaction.save();

    res.json({
      success: true,
      message: `Transaction saved successfully.`,
      data: savedTransaction
    })
  }
  catch (e) {
    res.json({
      success: false,
      message: e.message,
      data: null
    })
  }
}

const getTransactions = async (req, res) => {
  const { userId } = req.query;

  try {

  const user = await User.findById(userId.trim())

  if(!user){
    return res.json({
      success: false,
      message: `User not found`,
      data: null
    })
  }

  const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1});

  res.json({
    success: true,
    message: `Transactions fetched successfully`,
    data: transactions
  })
}
catch (e) {
  res.json({
    success: false,
    message: e.message,
    data: null
  })
}
}

const deleteTransaction = async (req, res) => {
  const {id} = req.params;

  await Transaction.deleteOne({_id: id});

  res.json({
    success: true,
    message: `Transaction deleted successfully`,
    data: null
  })
}

export { postTransaction, getTransactions, deleteTransaction }