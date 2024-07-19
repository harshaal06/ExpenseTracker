import React, { useContext, useRef, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from '../components/MyContext';
import { useNavigate } from 'react-router-dom';

function Login({ onClose }) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const { setUser } = useContext(MyContext);
    const navigate = useNavigate();

    const [activeComponent, setActiveComponent] = useState("Login");
    const handleSetActiveComponent = (component) => {
        setActiveComponent(component);
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = async () => {
        if (!email) {
            toast.error('Invalid email address');
            return;
        }
        if (!password) {
            toast.error('Invalid Password');
            return;
        }
        else {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password })
            if (!response.data.success) {
                toast.error(response.data.message);
            }
            else if (response.data.success) {
                toast.success(response.data.message);
                setUser(response.data.data);
                localStorage.setItem('user', JSON.stringify(response.data.data));

                setTimeout(() => {
                    onClose();
                    navigate('/dashboard');
                }, 1000)
            }
        }
    }

    const [fullName, setFullName] = useState('');
    const [Email, setEmails] = useState('');
    const [Password, setPasswords] = useState('');
    const [dob, setDob] = useState('');

    const signUp = async () => {
        if (!(fullName && Email && Password && dob)) {
            toast.error('All information required.');
            return;
        }
        else {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { fullName, email: Email, password: Password, dob })
            if (!response.data.success) {
                toast.error(response.data.message);
            }
            else if (response.data.success) {
                toast.success(response.data.message);
                setUser(response.data.data);
                localStorage.setItem('user', JSON.stringify(response.data.data));

                setTimeout(() => {
                    onClose();
                    window.location.href = `/dashboard`
                }, 2000)
            }
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col gap-3 -mt-8'>
                <button onClick={onClose} className='place-self-end me-4'><RxCross1 className='text-white' size={30} /></button>
                <div className='bg-zinc-900 py-5 px-7 rounded-lg border border-green-700 mx-4 text-zinc-500'>
                    {activeComponent === "Login" && (
                        <div className='w-80'>
                            <h1 className='text-center font-semibold text-4xl leading-none tracking-tighter text-gray-300'>Log in</h1>
                            <p className='text-sm text-center mt-2'>Don't have an account? <span className='text-gray-400 cursor-pointer font-semibold' onClick={() => handleSetActiveComponent('SignUp')}>SignUp</span></p>
                            <form class="mt-4 text-gray-400">
                                <div class="space-y-4">
                                    <div className='w-full'>
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </div>
                                    {/* <div>
                                        <label class="text-base font-medium ">Email address :</label>
                                        <input
                                            class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                            type="email"
                                            placeholder="email@example.com"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label class="text-base font-medium ">Password :</label>
                                        <input
                                            class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                            type="password"
                                            placeholder="******"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                    </div> */}
                                    <div className='flex justify-center'>
                                        <button onClick={login}
                                            type="button"
                                            className='bg-green-600 mt-8 text-white py-2 px-8 font-semibold rounded-lg hover:bg-green-500'>Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {activeComponent === "SignUp" && (
                        <div className='w-80'>
                            <h1 className='text-center font-semibold text-4xl leading-none tracking-tighter text-gray-300'>Sign Up</h1>
                            <p className='text-sm text-center mt-2'>Already have an account? <span className='text-gray-400 cursor-pointer font-semibold' onClick={() => handleSetActiveComponent('Login')}>Login</span></p>
                            <form class="mt-4 text-gray-400">
                                <div class="space-y-4">
                                <div className='w-full'>
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="text"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => {
                                                setFullName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type='email'
                                            placeholder="Email"
                                            value={Email}
                                            onChange={(e) => {
                                                setEmails(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="password"
                                            placeholder="Password"
                                            value={Password}
                                            onChange={(e) => {
                                                setPasswords(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full'>
                                    <p className="font-medium text-gray-300 tracking-wider text-sm">Date of Birth :
                                        <input
                                            class="pb-1 pt-2 px-2 border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="date"
                                            value={dob}
                                            onChange={(e) => {
                                                setDob(e.target.value)
                                            }}
                                        />
                                        </p>
                                    </div>
                                    {/* <div>
                                        <label class="text-base font-medium ">Full Name :</label>
                                        <input
                                            class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                            type="text"
                                            placeholder="elon musk"
                                            value={fullName}
                                            onChange={(e) => {
                                                setFullName(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label class="text-base font-medium ">Email address :</label>
                                        <input
                                            class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                            type='email'
                                            placeholder="email@example.com"
                                            value={Email}
                                            onChange={(e) => {
                                                setEmails(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label class="text-base font-medium ">
                                            Password :
                                        </label>
                                        <input
                                            class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                            type="password"
                                            placeholder="******"
                                            value={Password}
                                            onChange={(e) => {
                                                setPasswords(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label class="text-base font-medium ">
                                            Date of Birth :
                                        </label>
                                        <input
                                            class="mt-2 h-10 w-full rounded-lg border text-gray-300 border-zinc-700 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-green-700"
                                            type="date"
                                            placeholder="******"
                                            value={dob}
                                            onChange={(e) => {
                                                setDob(e.target.value)
                                            }}
                                        />
                                    </div> */}
                                    <div className='flex justify-center'>
                                        <button onClick={signUp}
                                            type="button"
                                            className='bg-green-600 mt-6 text-white py-2 px-8 font-semibold rounded-lg hover:bg-green-500'
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Login