import React, { useContext, useEffect, useState } from 'react';
import Login from '../components/Login';
import { Link, useNavigate } from 'react-router-dom'
import { GrFormNextLink } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion"
import { MyContext } from '../components/MyContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const motionAni = (time) =>({
    hidden:{y:100,opacity:0},
    visible:{
      y:0,
      transition: {duration:0.5,delay:time},
      opacity:1,
    }
  });

function Home() {
    const { user, setUser } = useContext(MyContext);
    const navigate = useNavigate();
    
    const loadUser = async () => {
        toast.loading('Please wait 50 seconds for server start.');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`);

        toast.dismiss();
        if(response.data.success){
            toast.success('Server startd successfully!');
        }else{
            toast.error('Something went wrong.');
        }
        const data = JSON.parse(localStorage.getItem('user'));
        setUser(data);
    }
    useEffect(() => {
        loadUser();
    }, [])

    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className='w-full h-screen bg-[#282c34] pt-3'>
            <div className='sticky top-0 opacity-80 flex justify-between items-center px-3 md:px-20 py-4 bg-zinc-900'>
                <h3 className=' text-zinc-400 text-2xl font-semibold leading-none tracking-tighter'>ExpenseEase</h3>
                <div>
                    {user && (
                        <div>
                            <Link to={'/dashboard'}><button
                                className='bg-green-600 text-white py-2 px-5 font-semibold rounded-xl hover:bg-green-500'>
                                Dashboard</button>
                            </Link>
                            <LuLogOut onClick={() => {
                                setUser([]);
                                toast.success("User sign out successfully");
                                localStorage.removeItem('user');
                                loadUser();
                            }
                            } className='text-red-300 inline ms-4 cursor-pointer' size='2.2em'/>
                        </div>
                    )}
                    {!user && (
                        <button
                            onClick={() => setShowLogin(true)}
                            className='bg-blue-600 text-white py-2 px-5 font-semibold rounded-lg hover:bg-blue-500'>
                            Login
                        </button>
                    )}
                </div>

            </div>
            <div className='absolute top-1/3 left-1/2 w-4/5 -translate-x-[50%] -translate-y-[50%] text-center'>
                <motion.h1 variants={motionAni(0.2)} initial="hidden" animate='visible' className='text-5xl md:text-[75px] leading-none tracking-tighter font-semibold text-blck'>Track, manage, save, thrive</motion.h1>
                <motion.h2 variants={motionAni(0.4)} initial="hidden" animate='visible' className='mt-3 text-center opacity-85 text-xl text-[27px] font-semibold leading-6 tracking-normal text-black'>Transform your financial habits<br />with ExpenseEase intuitive expense tracker.</motion.h2>
                <motion.button variants={motionAni(0.5)} initial="hidden" animate='visible' className='mt-8 border-2 border-green-700 text-zinc-300 py-2 px-5 font-semibold rounded-lg hover:bg-[#343942]' 
                    onClick={() => !user ? setShowLogin(true) : navigate('/dashboard')}>Connect with ExpenseEase <GrFormNextLink className='inline' size="1.5em"/>
                </motion.button>
            </div>
            {showLogin && <Login onClose={() => { setShowLogin(false) }} />}
        </div>
    )
}

export default Home