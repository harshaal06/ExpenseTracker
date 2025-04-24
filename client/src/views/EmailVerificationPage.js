import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';
import { MyContext } from '../components/MyContext';

const EmailVerificationPage = () => {
  const [code, setCode] = useState("");
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (!user) {
  //     toast.error("Login First");
  //     navigate(`/`);
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    if (!code) {
      toast.error('Enter code');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/verify-email`, { code });

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        
        setTimeout(() => {
          setUser(response.data.data);
          // gnavigate(`/dashboard/${response.data.data._id}`);
        }, 1000);
      }
    } catch (error) {
      console.error('Error while submitting the code:', error);
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-45 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[340px] md:w-96 bg-zinc-900 py-10 px-10 rounded-lg border border-green-700 text-zinc-500'>
        <div>
          <h1 className='text-center font-semibold text-4xl leading-none tracking-tighter text-gray-300'>Verify Your Email!</h1>
          <p className="text-sm text-center mb-4 mt-2">
            Enter the 6-digit code sent to your email
          </p>
          <form onSubmit={handleSubmit} className="mt-6 text-gray-400">
            <input
              type="number"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="w-full text-center tracking-widest text-xl py-3 px-4 border-b text-gray-300 border-zinc-500 bg-transparent placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
            />
            <button disabled={isLoading}
              type="submit"
              className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition-all"
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
    // <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100 px-4">
    //   <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
    //     <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
    //       Verify Your Email!
    //     </h2>

    //     <p className="text-sm text-gray-500 text-center mb-4">
    //       Enter the 6-digit code sent to your email
    //     </p>

    //     <form onSubmit={handleSubmit} className="w-full">
    //       <input
    //         type="text"
    //         value={code}
    //         onChange={(e) => setCode(e.target.value)}
    //         placeholder="Enter code"
    //         className="w-full text-center tracking-widest text-xl py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
    //       />

    //       <button
    //         type="submit"
    //         className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
    //       >
    //         {isLoading ? "Loading..." : "Submit"}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default EmailVerificationPage;
