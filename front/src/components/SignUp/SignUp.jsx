import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx'
import styles from '../../styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [fullName, setFullName] = useState('');
    const [avatar, setAvatar] = useState(null);
    const navigate = useNavigate();

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", avatar);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("fullname", fullName);

        axios.post(`${server}/user/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            toast.success(res.data.message);
            setEmail("")
            setPassword("")
            setFullName("")
            setAvatar()
        }).catch((err) => {
            toast.error(error.response.data.message)
        })
    }

    return (
        <div className='min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                    Register as a new user
                </h2>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='fullname' className='block text-sm font-medium text-gray-700 mb-2'>
                                Full Name
                            </label>
                            <div>
                                <input type='text' name='fullname'
                                    id='fullname'
                                    autoComplete='fullname'
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                    value={fullName}
                                    className='appearance-none block w-full px-3 
                py-2 border border-gray-300 rounded-md 
                shadow-sm placeholder-green-400 
                focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm capitalize'
                                />

                            </div>
                        </div>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                                Email address
                            </label>
                            <div>
                                <input type='email'
                                    name='email'
                                    id='email'
                                    autoComplete='email'
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none block w-full px-3 
                py-2 border border-gray-300 rounded-md 
                shadow-sm placeholder-green-400 
                focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm'
                                />

                            </div>
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                                Password
                            </label>
                            <div className='mt-1 relative'>
                                <input type={visiblePassword ? 'text' : 'password'}
                                    name='password'
                                    id='password'
                                    autoComplete='curret-password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='appearance-none block w-full px-3 
                py-2 border border-gray-300 rounded-md 
                shadow-sm placeholder-green-400 
                focus:outline-none focus:ring-blue-500 
                focus:border-blue-500 sm:text-sm'
                                />
                                {
                                    visiblePassword ? (
                                        <AiOutlineEye
                                            className="absolute right-2 top-2 cursor-pointer"
                                            size={25}
                                            onClick={() => setVisiblePassword(!visiblePassword)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className="absolute right-2 top-2 cursor-pointer"
                                            size={25}
                                            onClick={() => setVisiblePassword(!visiblePassword)}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div>
                            <label htmlFor='avatar' className='ml-2 block text-sm font-medium text-gray-700'>

                            </label>
                            <div className='flex items-center'>
                                <span className='inline-block h-8 w-8 rounded-full overflow-hidden'>
                                    {
                                        avatar ? (
                                            <img src={URL.createObjectURL(avatar)} alt='avatar' className='h-full w-full object-cover rounded-full' />
                                        ) : (
                                            <RxAvatar className='h-full w-full object-cover rounded-full' />
                                        )
                                    }
                                </span>
                                <label className='ml-5 cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'>
                                    <span>Upload File</span>
                                    <input type='file' name='avatar' id='avatar' accept='.jpg,.jpeg,.png'
                                        onChange={handleFileInput}
                                        className='sr-only'
                                    />
                                </label>
                            </div>
                            {/* <div className='text-sm'>
                                <a href='.fotgot-password' className='font-medium text-blue-600 hover:text-blue-500'>
                                    Forgot your password?
                                </a>
                            </div> */}
                        </div>

                        <div>
                            <button type='submit'
                                className='w-full flex justify-center py-2 px-4 
                                    border border-transparent shadow-sm text-sm font-medium 
                                    rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                                        '>
                                Submit
                            </button>
                        </div>
                        <div className={`${styles.normalFlex} w-full`}>
                            <h4 className='mr-3'>Already have an account?</h4>
                            <Link to='/login' className='font-medium text-indigo-600 hover:text-indigo-500'>
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
