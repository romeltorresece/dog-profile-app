import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const { username, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dogs');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        username,
        email,
        password
      };
      
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    
  }

  return (
    <div className='container mx-auto px-6'>
      <h1 className='text-4xl mt-6 text-center'>Register an Account</h1>
      <div className='mt-8 max-w-md mx-auto'>
        <form className='grid grid-cols-1 gap-4' onSubmit={onSubmit}>
          <label htmlFor='username' className='block'>
            <span className='text-gray-700'>Username</span>
            <input 
              type='text' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50' 
              name='username'
              value={username}
              onChange={onChange}
              />
          </label>
          <label htmlFor='email' className='block'>
            <span className='text-gray-700'>Email</span>
            <input 
              type='email' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50'
              name='email'
              value={email}
              placeholder='john@user.com' 
              onChange={onChange}
              />
          </label>
          <label htmlFor='password' className='block'>
            <span className='text-gray-700'>Password</span>
            <input 
              type='password' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50' 
              name='password'
              value={password}
              onChange={onChange}
              />
          </label>
          <label htmlFor='password2' className='block'>
            <span className='text-gray-700'>Confirm Password</span>
            <input 
              type='password' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50' 
              name='password2'
              value={password2}
              onChange={onChange}
              />
          </label>
          <button type='submit' className='rounded-md bg-green-600 py-3 text-white text-lg'>Sign Up</button>
        </form>
        
      </div>
    </div>
  );
}

export default Register;