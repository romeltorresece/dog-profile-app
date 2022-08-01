import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createDog, reset } from '../features/dogs/dogSlice';
import Loading from '../components/Loading';

function NewDogForm() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        breed: '',
        location: '',
        description: '',
    });

    const { name, age, breed, location, description } = formData;

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.dogs);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (!user) {
           navigate('/login');
        }

        if (isSuccess) {
          toast.success('Created New Dog Profile!');
          navigate('/dogs');
        }

        return () => {
          dispatch(reset());
        };
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const dogData = {
            name,
            age,
            breed,
            location,
            description
        };

        dispatch(createDog(dogData));
    };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6'>
      <h1 className='text-4xl mt-6 text-center'>New Dog Profile</h1>
      <div className='mt-8 max-w-md mx-auto mb-4'>
        <form className='grid grid-cols-1 gap-3' onSubmit={onSubmit}>
          <label htmlFor='name' className='block'>
            <span className='text-gray-700'>Dog's Name</span>
            <input 
              type='text' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50' 
              name='name'
              value={name}
              onChange={onChange}
              />
          </label>
          <label htmlFor='age' className='block'>
            <span className='text-gray-700'>Age</span>
            <input 
              type='text' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50'
              name='age' 
              value={age}
              onChange={onChange}
              />
          </label>
          <label htmlFor='breed' className='block'>
            <span className='text-gray-700'>Breed</span>
            <input 
              type='text' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50' 
              name='breed'
              value={breed}
              onChange={onChange}
              />
          </label>
          <label htmlFor='location' className='block'>
            <span className='text-gray-700'>Location</span>
            <input 
              type='text' 
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50' 
              name='location'
              value={location}
              onChange={onChange}
              />
          </label>
          <label htmlFor='description' className='block'>
            <span className='text-gray-700'>Description</span>
            <textarea className='
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    rows='3'
                    name='description'
                    value={description}
                    onChange={onChange}
            >
            </textarea>
          </label>
          <button type='submit' className='rounded-md bg-green-600 py-3 text-white text-lg'>Save Profile</button>
        </form>
        
      </div>
    </div>
  );
}

export default NewDogForm;