import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import { getProfile, postLogin, postLogout, postSignup, verifyEmail } from './controllers/user.js';
import { deleteTransaction, getTransactions, postTransaction } from './controllers/transaction.js';
import { verifyToken } from './utils/verifyUser.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://expense-ease-app-harshal.vercel.app", credentials: true }));


const connectDB = async () =>{
  const conn = await mongoose.connect(process.env.MONGODB_URL)

  if (conn) {
    console.log(`MongoDB connected successfully ✅`);
  }
};
connectDB();


app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: `Welcome to Expense Tracker API`
  })
})

app.post("/signup", postSignup)
app.post("/verify-email",verifyEmail);
app.post("/login", postLogin)
app.post("/logout", postLogout)
app.get("/profile", verifyToken, getProfile)

app.post("/transaction", verifyToken, postTransaction)
app.get("/transactions", verifyToken, getTransactions)
app.delete("/transaction/:id", verifyToken, deleteTransaction)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
