import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrFormNextLink } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import axios from 'axios';

import Login from '../components/Login';
import { MyContext } from '../components/MyContext';
import MainImg from './lap.png';
import MainImgS from './mob.jpg';

const motionAni = (delay) => ({
    hidden: { y: 100, opacity: 0 },
    visible: {
        y: 0,
        transition: { duration: 0.5, delay },
        opacity: 1,
    },
});

function Home() {
    const { user, setUser } = useContext(MyContext);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    const loadUser = async () => {
        toast.loading('Please wait 50 seconds for server start.');

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`);
            toast.dismiss();

            if (response.data.success) {
                toast.success('Server started successfully!');
            } else {
                toast.error('Something went wrong.');
            }

            if (document.cookie.split('; ').find(row => row.startsWith('access_token='))) {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, { withCredentials: true });
                setUser(res.data.data);
            }
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to connect to the server.');
            console.error(error);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const handleLogout = async () => {
        setUser(null);

        try {
            document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, { withCredentials: true });

            toast.success("User signed out successfully");
            setTimeout(() => {
                window.location.href = `/`;
            }, 1000);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className='w-full h-screen bg-[#282c34] pt-3'>
            <div className='sticky top-0 opacity-80 flex justify-between items-center px-3 md:px-20 py-4 bg-zinc-900'>
                <h3 className='text-zinc-400 text-2xl font-semibold leading-none tracking-tighter'>ExpenseEase</h3>
                <div>
                    {user ? (
                        <div>
                            <Link to={`/dashboard/${user._id}`}>
                                <button className='bg-green-600 text-white py-2 px-5 font-semibold rounded-xl hover:bg-green-500'>
                                    Dashboard
                                </button>
                            </Link>
                            <LuLogOut onClick={handleLogout} className='text-red-300 inline ms-4 cursor-pointer' size='2.2em' />
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className='bg-blue-600 text-white py-2 px-5 font-semibold rounded-lg hover:bg-blue-500'>
                            Login
                        </button>
                    )}
                </div>
            </div>

            <div className='absolute md:mt-10 top-1/2 left-1/2 w-4/5 -translate-x-[50%] -translate-y-[50%] text-center'>
                <motion.h1
                    variants={motionAni(0.3)}
                    initial="hidden"
                    animate='visible'
                    className='text-5xl md:text-[75px] leading-none tracking-tighter font-semibold text-black'>
                    Track, manage, save, thrive
                </motion.h1>
                <motion.h2
                    variants={motionAni(0.5)}
                    initial="hidden"
                    animate='visible'
                    className='mt-2 opacity-85 text-xl md:text-[27px] font-semibold leading-6 tracking-normal text-black'>
                    Transform your financial habits<br />with ExpenseEase intuitive expense tracker.
                </motion.h2>
                <motion.button
                    variants={motionAni(0.6)}
                    initial="hidden"
                    animate='visible'
                    className='mt-6 border-2 border-green-700 text-zinc-300 py-2 px-5 font-semibold rounded-lg hover:bg-[#343942]'
                    onClick={() => user ? navigate(`/dashboard/${user._id}`) : setShowLogin(true)}>
                    Connect with ExpenseEase <GrFormNextLink className='inline' size="1.5em" />
                </motion.button>
                <motion.div
                    variants={motionAni(0.7)}
                    initial="hidden"
                    animate='visible'
                    className='relative mt-5 md:mt-2 mx-auto md:w-2/3'>
                    <img src={MainImg} className='md:w-11/12' alt="Laptop view" />
                    <img src={MainImgS} className='w-[22%] absolute end-0 md:end-3 top-16 md:top-24 rounded-xl' alt="Mobile view" />
                </motion.div>
            </div>

            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
    );
}

export default Home;
