import React, { useContext, useRef, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from '../components/MyContext';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { FaEye, FaEyeSlash, FaUserLock, FaUser } from "react-icons/fa";
import { MdMail, MdDateRange } from "react-icons/md";

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
    const [showPass, setShowPass] = useState(true);
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
    const [showPasss, setShowPasss] = useState(true);

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
                handleSetActiveComponent('Login');
                // setUser(response.data.data);
                // localStorage.setItem('user', JSON.stringify(response.data.data));

                // setTimeout(() => {
                //     onClose();
                //     window.location.href = `/dashboard`
                // }, 2000)
            }
        }
    }

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col gap-3 -mt-8'>
                <button onClick={onClose} className='place-self-end me-4'><RxCross1 className='text-white' size={30} /></button>
                <div className='bg-zinc-900 py-5 px-7 rounded-lg border border-green-700 mx-6 text-zinc-500'>
                    {activeComponent === "Login" && (
                        <div className='w-80'>
                            <h1 className='text-center font-semibold text-4xl leading-none tracking-tighter text-gray-300'>Log in</h1>
                            <p className='text-sm text-center mt-2'>Don't have an account? <span className='text-gray-400 cursor-pointer font-semibold' onClick={() => handleSetActiveComponent('SignUp')}>SignUp</span></p>
                            <form class="mt-6 text-gray-400">
                                <div class="space-y-5">
                                    <div className='w-full flex items-center gap-1'>
                                        <MdMail size='1.7em' />
                                        <input
                                            class="ms-1 p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value)
                                            }}
                                        />
                                    </div>
                                    <div className='w-full flex items-center relative gap-1'>
                                        <FaUserLock size='1.7em' />
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type={`${showPass ? 'password' : 'text'}`}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                                        />
                                        {showPass ? <FaEye onClick={() => setShowPass(false)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' /> : <FaEyeSlash onClick={() => setShowPass(true)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' />
                                        }
                                    </div>
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
                            <form class="mt-5 text-gray-400">
                                <div class="space-y-5">
                                    <div className='w-full flex items-center gap-2'>
                                        <FaUser size='1.7em' />
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
                                    <div className='w-full flex items-center gap-2'>
                                        <MdMail size='1.7em' />
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
                                    <div className='w-full relative flex items-center gap-2'>
                                        <FaUserLock size='1.7em' />
                                        <input
                                            class="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type={`${showPasss ? 'password' : 'text'}`}
                                            placeholder="Password"
                                            value={Password}
                                            onChange={(e) => {
                                                setPasswords(e.target.value)
                                            }}
                                        />
                                        {showPasss ? <FaEye onClick={() => setShowPasss(false)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' /> : <FaEyeSlash onClick={() => setShowPasss(true)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' />
                                        }
                                    </div>
                                    <div className='w-full flex items-center gap-2'>
                                        <MdDateRange size='1.7em' />
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