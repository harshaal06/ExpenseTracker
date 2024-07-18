import React, { useEffect, useState } from 'react'
import ExpenseCard from '../components/ExpenseCard';
import toast from 'react-hot-toast';
import axios from 'axios';

function Dashboard() {

  const [user, setUser] = useState([]);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('user'));
    if (response) {
      setUser(response);
    }
    if (!response) {
      window.location.href = `/`
    }
  }, [])

  const [transactions, setTransactions] = useState([])
  const [netIncome, setNetIncome] = useState(0)
  const [netExpense, setNetExpense] = useState(0)

  const loadTransactions = async () => {
    if (!user._id) {
      return;
    }
    toast.loading('Loading transactions...')
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`)

    const allTransactions = response.data.data
    toast.dismiss()

    setTransactions(allTransactions)
  }

  useEffect(() => {
    loadTransactions()
  }, [user])

  useEffect(() => {
    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount
      }
      else {
        expense += transaction.amount
      }
    })

    setNetIncome(income)
    setNetExpense(expense)
  }, [transactions])

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const addTransaction = async () => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/transaction`, {
      title,
      amount,
      type,
      description,
      category,
      user: user._id
    })

    toast.success(response.data.message)

    setTitle('')
    setAmount()
    setType('')
    setCategory('')

    loadTransactions()
  }

  return (
    <div className='w-full h-screen bg-[#282c34] pt-3'>
      <div className='absolute top-1/2 left-1/2 w-4/5 h-4/5 bg-zinc-900 rounded-3xl shadow-2xl -translate-x-[50%] -translate-y-[50%] p-5 flex gap-5'>
        <div className='text-white w-1/3 tracking-tighter '>
          <h1 className='text-5xl mt-3 font-serif text-center'>नमस्ते 🙏</h1>
          <div className='bg-zinc-400 text-black p-5 rounded-3xl shadow-lg mt-4'>
            <p className='text-lg tracking-normal '>Balance:</p>
            <h3 className='text-4xl font-semibold font-sans'>₹ {netIncome - netExpense}</h3>
          </div>
          <div className='flex gap-5 mt-5'>
            <div className='bg-green-600 w-full text-white p-3 px-4 rounded-3xl shadow-lg'>
              <p className='text-lg tracking-normal font-sans'>Income:</p>
              <h3 className='text-3xl font-semibold font-sans'>₹ {netIncome}</h3>
            </div>
            <div className='bg-red-600 w-full text-white p-3 px-4 rounded-3xl shadow-lg'>
              <p className='text-lg tracking-normal font-sans'>Expense:</p>
              <h3 className='text-3xl font-semibold font-sans'>₹ {netExpense}</h3>
            </div>
          </div>
          <div className='mt-3'>
            <h3 className='text-2xl tracking-normal font-semibold text-zinc-400'>Breakdown</h3>
            <div className='h-[210px] overflow-y-scroll card-box'>
              {
                transactions.map((transaction) => {
                  const { _id, title, amount, category, description, type, createdAt } = transaction

                  return (
                    <ExpenseCard key={_id} _id={_id} title={title} amount={amount} category={category} description={description} type={type} createdAt={createdAt} loadTransactions={loadTransactions} />)
                })
              }
            </div>
          </div>
        </div>
        <div className='w-2/3 bg-zinc-800 rounded-3xl p-4 text-white'>
          <div className='bg-zinc-900 h-1/3 rounded-3xl pt-7'>
            <h1 className='text-5xl text-center'>Hello, {user.fullName}</h1>
            <button onClick={() => {
              localStorage.removeItem('user');
              toast.success("User sign out successfully");
              setTimeout(() => {
                window.location.href = `/`
              }, 1000);
            }} className='bg-red-600 text-white py-2 px-10 mx-auto block mt-6 font-semibold rounded-xl hover:bg-red-500'>Sign Out</button>
          </div>
          <div className='w-2/3 mx-auto p-5 mt-6'>
            <div className='w-full'>
              <input
                class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
            <div className='w-full flex gap-4 mt-4'>
              <div className='w-1/2'>
                <input
                  class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value)
                  }}
                />
              </div>
              <div className='w-1/2'>
                <input
                  class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className='w-full mt-4'>
              <input
                class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                type="text"
                placeholder="Any Note"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>
            <div className='mt-5'>
              <p className="font-medium text-gray-400 tracking-wider text-center text-sm">Type :
                <select value={type}
                  onChange={(e) => {
                    setType(e.target.value)
                  }}
                  className='ms-2 py-2 border-b focus:outline-none focus:ring-0 focus:border-zinc-200 bg-transparent border-zinc-500'>
                  <option className='text-black' value="">Select</option>
                  <option className='text-black' value="credit">Income</option>
                  <option className='text-black' value="debit">Expense</option>
                </select>
              </p>
            </div>
            <button onClick={addTransaction} className='bg-zinc-400 text-black py-2 px-10 mx-auto block mt-10 font-semibold rounded-xl hover:bg-zinc-300'>Add Transaction</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard