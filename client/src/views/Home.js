import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import { Link } from 'react-router-dom'

function Home() {
    const [showLogin, setShowLogin] = useState(false)

    const [user, setUser] = useState([]);
    const loadUser = async () => {
        const response = JSON.parse(localStorage.getItem('user'));
        setUser(response);
    }
    useEffect(() => {
        loadUser();
    }, [])

    return (
        <div className='w-full h-screen bg-[#282c34] pt-3'>
            <div className='sticky top-0 opacity-80 flex justify-between items-center px-3 md:px-20 py-4 bg-zinc-900'>
                <h3 className=' text-zinc-400 text-2xl font-semibold leading-none tracking-tighter'>ExpenseEase</h3>
                <div>
                    {user && (
                        <div className='w-56 flex justify-between'>
                            <Link to={'/dashboard'}><button
                                className='bg-green-600 text-white py-2 px-5 font-semibold rounded-xl hover:bg-green-500'>
                                Dashboard</button></Link>
                                <button
                                onClick={() => {localStorage.removeItem('user')
                                    window.location.href = `/`}
                                }
                                className='bg-green-600 text-white py-2 px-3 font-semibold rounded-xl hover:bg-green-500'>
                                Logout
                            </button>
                        </div>
                    )}
                    {!user && (
                            <button
                                onClick={() => setShowLogin(true)}
                                className='bg-blue-600 text-white py-2 px-5 font-semibold rounded-xl hover:bg-blue-500'>
                                Login
                            </button>
                    )}
                </div>

            </div>
            <div className='absolute top-1/3 left-1/2 w-4/5 -translate-x-[50%] -translate-y-[50%] text-center'>
                <h1 className='text-[75px] leading-none tracking-tighter font-semibold text-blck'>Track, manage, save, thrive</h1>
                <h2 className='mt-3 text-center opacity-85 text-[27px] font-semibold leading-none tracking-tight text-black'>Transform your financial habits<br />with BudgetBuddy's intuitive expense tracker.</h2>
                <button className='mt-8 bg-green-700 text-white py-2 px-5 font-semibold rounded-xl hover:bg-green-600'>Get ExpenseEase free</button>
            </div>
            {showLogin && <Login loadUser={loadUser} onClose={() => { setShowLogin(false) }} />}
        </div>
    )
}

export default Home