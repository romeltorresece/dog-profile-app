import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dogs');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6'>
      <h1 className='text-4xl mt-6 text-center'>Login</h1>
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
          <button type='submit' className='rounded-md bg-sky-600 py-3 text-white text-lg'>Sign In</button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;