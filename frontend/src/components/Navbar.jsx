import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/dogs');
  };

  return (
    <nav className='container mx-auto px-6 py-3 flex justify-between items-center'>
      <div>
        <Link to='/dogs' className='text-3xl'>DOGS</Link>
      </div>
      <ul className='hidden space-x-6 md:flex'>
        {user ? (
            <li>
              <button className='text-lg hover:text-slate-600' onClick={onClick}>Logout</button>
            </li>
          ) : (
            <>
              <li className='text-lg hover:text-slate-600'>
                <Link to='/login'>Login</Link>
              </li>
              <li className='text-lg hover:text-slate-600'>
                <Link to='/register'>Register</Link>
              </li>
            </>
          )}
      </ul>
    </nav>
  );
}

export default Navbar;