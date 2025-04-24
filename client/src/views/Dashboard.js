import React, { useContext, useEffect, useState } from 'react';
import ExpenseCard from '../components/ExpenseCard';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MyContext } from '../components/MyContext';
import { useNavigate } from 'react-router-dom';
import { MdTitle, MdOutlineCategory, MdNotes, MdHome } from "react-icons/md";
import { RiMoneyRupeeCircleLine, RiContractUpDownLine } from "react-icons/ri";
import EmailVerificationPage from './EmailVerificationPage';

function Dashboard() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (!user) {
      toast.error("Login First");
      navigate('/');
    }
    // else if (!user.isVerified) {
    //   setTimeout(() => {
    //     toast.error("Email not verified");
    //     navigate(`/verify-email`);
    //   }, 1000);
    // }
  }, [user, navigate]);

  const loadTransactions = async () => {
    if (!user?._id) {
      toast.error('Something went wrong.');
      return;
    }

    toast.loading('Loading transactions...');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/transactions?userId=${user._id}`, { withCredentials: true });
      toast.dismiss();

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      setTransactions(response.data.data || []);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to fetch transactions');
      setTransactions([]);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  const addTransaction = async () => {
    if (!(title && amount && type)) {
      toast.error('All information required.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transaction`,
        { title, amount, type, description, category, user: user._id },
        { withCredentials: true }
      );

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setTitle('');
        setAmount('');
        setType('');
        setCategory('');
        setDescription('');

        setTimeout(() => {
          loadTransactions();
        }, 1000);
      }
    } catch (error) {
      toast.error('Failed to add transaction');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });
      toast.success("User signed out successfully");

      setTimeout(() => {
        window.location.href = `/`;
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className='w-full h-full md:h-screen bg-[#282c34] py-3'>
      <div className='md:absolute md:top-1/2 md:left-1/2 w-96 mx-auto md:mx-0 md:w-4/5 h-auto md:h-4/5 bg-zinc-900 rounded-3xl shadow-2xl md:-translate-x-[50%] md:-translate-y-[50%] p-5 flex flex-wrap md:flex-nowrap gap-5'>
        <div className='text-white w-full md:w-1/3 tracking-tighter'>
          <div onClick={handleHomeClick} className='cursor-pointer flex items-center'>
            <MdHome size='2.5em' className=' me-2' />
            <h1 className='text-4xl tracking-tight inline-block'>ExpenseEase</h1>
          </div>
          <div className='bg-zinc-400 text-black p-5 rounded-3xl shadow-lg mt-4'>
            <p className='text-lg tracking-normal'>Balance:</p>
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
            <div className='h-[224px] overflow-y-scroll card-box'>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <ExpenseCard
                    key={transaction._id}
                    {...transaction}
                    loadTransactions={loadTransactions}
                  />
                ))
              ) : (
                <p>No transactions available.</p>
              )}
            </div>
          </div>
        </div>

        <div className='w-full md:w-2/3 bg-zinc-800 rounded-3xl p-4 text-white'>
          <div className='bg-zinc-900 h-auto md:h-1/3 rounded-3xl flex justify-center items-center'>
            <div className='p-4'>
              <h1 className='text-2xl md:text-5xl text-center'>Hello, {user?.fullName}</h1>
              <button
                onClick={handleLogout}
                className='bg-red-600 text-white py-1 md:py-2 px-5 md:px-10 mx-auto block mt-3 md:mt-5 md:font-semibold text-sm rounded-lg hover:bg-red-500'
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className='md:w-2/3 mx-auto p-2 md:p-5 md:mt-6 space-y-4'>
            <div className='w-full flex items-center gap-1'>
              <MdTitle size='1.7em' />
              <input
                className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='w-full flex gap-4 md:mt-4'>
              <div className='w-1/2 flex items-center gap-1'>
                <RiMoneyRupeeCircleLine size='1.7em' />
                <input
                  className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className='w-1/2 flex items-center gap-1'>
                <MdOutlineCategory size='1.7em' />
                <input
                  className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className='w-full md:mt-4 flex items-center gap-1'>
              <MdNotes size='1.7em' />
              <input
                className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                type="text"
                placeholder="Any Note"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='md:mt-5 flex items-center gap-1'>
              <RiContractUpDownLine size='1.7em' />
              <select
                className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 focus:outline-none focus:ring-0 focus:border-zinc-200"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option className='text-black' value="">Select type</option>
                <option className='text-black' value="credit">Credit</option>
                <option className='text-black' value="debit">Debit</option>
              </select>
            </div>
            <div className='w-full'>
              <button
                className='w-full bg-green-600 text-white p-2 rounded-lg md:mt-5 font-semibold hover:bg-green-500'
                onClick={addTransaction}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
      {user && !user.isVerified && <EmailVerificationPage />}
    </div>
  );
}

export default Dashboard;
