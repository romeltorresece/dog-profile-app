import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/dogs');
    setIsOpen(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <nav className='container mx-auto border-b-2 px-6 py-3'>
      <div className='flex justify-between items-center md:px-3'>
        <div className='flex justify-between space-x-6 items-center'>
          <Link to='/dogs' className='text-3xl font-bold'>DOGS</Link>
          <Link to='/dogs' className='hidden text-lg hover:text-slate-600 md:block'>All Dogs</Link>
          <Link to='/dogs/new' className='hidden text-lg hover:text-slate-600 md:block'>New Dog</Link>
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
      {/* Hamburger Icon */}
        <div 
          id='menu-btn' 
          className={`${isOpen? 'open' : ''} hamburger block md:hidden focus:outline-none`} 
          onClick={() => setIsOpen(prevState => !prevState)}
          >
          <span className='hamburger-top'></span>
          <span className='hamburger-middle'></span>
          <span className='hamburger-bottom'></span>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && 
      <div className='md:hidden'>
        <div id='menu' className='absolute z-20 flex flex-col items-center py-8 mt-2 space-y-2 bg-white w-40 right-4 border rounded-sm drop-shadow-md'>
              <Link to='/dogs' className='text-lg hover:text-slate-600' onClick={closeMenu}>All Dogs</Link>
              <Link to='/dogs/new' className='text-lg hover:text-slate-600' onClick={closeMenu}>New Dog</Link>
              {user ? (
                <button className='text-lg hover:text-slate-600' onClick={onClick}>Logout</button>
                ) : (
                  <>
                    <Link to='/login' className='text-lg hover:text-slate-600' onClick={closeMenu}>Login</Link>
                    <Link to='/register' className='text-lg hover:text-slate-600' onClick={closeMenu}>Register</Link>
                  </>
                )
              }
        </div>
      </div>
      }
    </nav>
  );
}

export default Navbar;