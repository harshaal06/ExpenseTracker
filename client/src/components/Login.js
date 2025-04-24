import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MyContext } from '../components/MyContext';
import { useNavigate } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { FaEye, FaEyeSlash, FaUserLock, FaUser } from "react-icons/fa";
import { MdMail, MdDateRange } from "react-icons/md";

function Login({ onClose }) {
    const modalRef = useRef();
    const { setUser } = useContext(MyContext);
    const navigate = useNavigate();

    const [activeComponent, setActiveComponent] = useState("Login");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [fullName, setFullName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [dob, setDob] = useState('');
    const [showSignupPassword, setShowSignupPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    const handleSetActiveComponent = (component) => {
        setActiveComponent(component);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        if (!email || !password) {
            toast.error('Invalid email or password');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password }, { withCredentials: true });

            if (!response.data.success) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                setUser(response.data.data);
                setTimeout(() => {
                    onClose();
                    navigate(`/dashboard/${response.data.data._id}`);
                }, 1000);
            }
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        if (!(fullName && signupEmail && signupPassword && dob)) {
            toast.error('All information is required.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, { fullName, email: signupEmail, password: signupPassword, dob }, { withCredentials: true });

            if (!response.data.success) {
                toast.error(response.data.message);
            } else {
                toast.success(response.data.message);
                setUser(response.data.data);
                setTimeout(() => {
                    onClose();
                    navigate(`/dashboard/${response.data.data._id}`);
                }, 2000);
                // handleSetActiveComponent('Login');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className='flex flex-col gap-3 -mt-8'>
                <button onClick={onClose} className='place-self-end'><RxCross1 className='text-white' size={30} /></button>
                <div className='w-[340px] md:w-96 bg-zinc-900 py-5 px-7 rounded-lg border border-green-700 text-zinc-500'>

                    {activeComponent === "Login" ? (
                        <div>
                            <h1 className='text-center font-semibold text-4xl leading-none tracking-tighter text-gray-300'>Log in</h1>
                            <p className='text-sm text-center mt-2'>
                                Don't have an account? 
                                <span className='text-gray-400 cursor-pointer font-semibold' onClick={() => handleSetActiveComponent('SignUp')}> Sign Up</span>
                            </p>
                            <form onSubmit={handleLoginSubmit} className="mt-6 text-gray-400">
                                <div className="space-y-5">
                                    <div className='w-full flex items-center gap-1'>
                                        <MdMail size='1.7em' />
                                        <input
                                            className="ms-1 p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full flex items-center relative gap-1'>
                                        <FaUserLock size='1.7em' />
                                        <input
                                            className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type={showPassword ? 'password' : 'text'}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {showPassword ? 
                                            <FaEye onClick={() => setShowPassword(false)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' /> : 
                                            <FaEyeSlash onClick={() => setShowPassword(true)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' />
                                        }
                                    </div>
                                    <div className='flex justify-center'>
                                        <button disabled={isLoading} type="submit" className='bg-green-600 mt-8 text-white py-2 px-8 font-semibold rounded-lg hover:bg-green-500'>
                                            {isLoading ? 'Logging in...' : 'Login'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h1 className='text-center font-semibold text-4xl leading-none tracking-tighter text-gray-300'>Sign Up</h1>
                            <p className='text-sm text-center mt-2'>
                                Already have an account? 
                                <span className='text-gray-400 cursor-pointer font-semibold' onClick={() => handleSetActiveComponent('Login')}> Login</span>
                            </p>
                            <form onSubmit={handleSignUpSubmit} className="mt-5 text-gray-400">
                                <div className="space-y-5">
                                    <div className='w-full flex items-center gap-2'>
                                        <FaUser size='1.7em' />
                                        <input
                                            className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type="text"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full flex items-center gap-2'>
                                        <MdMail size='1.7em' />
                                        <input
                                            className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type='email'
                                            placeholder="Email"
                                            value={signupEmail}
                                            onChange={(e) => setSignupEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full relative flex items-center gap-2'>
                                        <FaUserLock size='1.7em' />
                                        <input
                                            className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type={showSignupPassword ? 'password' : 'text'}
                                            placeholder="Password"
                                            value={signupPassword}
                                            onChange={(e) => setSignupPassword(e.target.value)}
                                        />
                                        {showSignupPassword ? 
                                            <FaEye onClick={() => setShowSignupPassword(false)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' /> : 
                                            <FaEyeSlash onClick={() => setShowSignupPassword(true)} className='absolute top-2 end-2 cursor-pointer' size='1.5em' />
                                        }
                                    </div>
                                    <div className='w-full flex items-center gap-2'>
                                        <MdDateRange size='1.7em' />
                                        <input
                                            className="p-2 w-full border-b text-gray-300 border-zinc-500 tracking-wider bg-transparent text-sm placeholder:text-gray-400 placeholder:tracking-widest focus:outline-none focus:ring-0 focus:border-zinc-200"
                                            type='date'
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex justify-center'>
                                        <button disabled={isLoading} type="submit" className='bg-green-600 mt-8 text-white py-2 px-8 font-semibold rounded-lg hover:bg-green-500'>
                                            {isLoading ? 'Signing up...' : 'Sign Up'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
