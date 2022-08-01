import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDog, reset } from '../features/dogs/dogSlice';

function EditDogForm({ dog, onUpdate }) {
  const [formData, setFormData] = useState({
    name: dog.name,
    age: dog.age,
    breed: dog.breed,
    location: dog.location,
    description: dog.description
  });

  const dispatch = useDispatch();

  const { name, age, breed, location, description } = formData;

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
      id: dog._id,
      name,
      age,
      breed,
      location,
      description,
    };

    dispatch(updateDog(dogData));
    onUpdate();
    
  };

  return (
    <div className='mt-8 max-w-md mx-auto mb-4 bg-white absolute right-6 left-6 top-6 p-6 rounded-md border shadow-lg z-10'>
        <form className='grid grid-cols-1 gap-2' onSubmit={onSubmit}>
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
          <button type='submit' className='rounded-md bg-green-600 py-3 text-white text-lg'>Save Update</button>
        </form>
        
      </div>
  );
}

export default EditDogForm;