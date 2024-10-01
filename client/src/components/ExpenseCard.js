import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { ImCross } from "react-icons/im";

function ExpenseCard({ _id, title, amount, category,description, type, createdAt, loadTransactions }) {

    const deleteTransaction = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`, { withCredentials: true })
    
        toast.success(response.data.message)

        setTimeout(() => {
            loadTransactions()
        }, 500)
      }
    return (
        <div className={`flex justify-between my-3 me-2 border-s-4 ps-2 ${type === "credit" ? "border-green-700": "border-red-700"}`} >
            <div>
                <h4 className='text-xl font-semibold font-sans tracking-normal'>{title}</h4>
                <p className='text-zinc-300 text-xs'>{category}</p>
            </div>
            <div className='flex items-center'>
                <div>
                    <h4 className='text-xl font-semibold font-sans '>₹ {amount}</h4>
                    <p className='text-zinc-300 text-xs text-end'>{new Date(createdAt).toLocaleString()}</p>
                </div>
                <ImCross onClick={deleteTransaction} className='text-white ms-3 cursor-pointer bg-red-400 p-3 rounded-md' size="2.5em" />
            </div>

        </div>
    )
}

export default ExpenseCard