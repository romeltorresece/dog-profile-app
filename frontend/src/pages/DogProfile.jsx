import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDog, deleteDog, reset } from '../features/dogs/dogSlice';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditDogForm from '../components/EditDogForm';
import Loading from '../components/Loading';

function DogProfile() {
  const [showEditForm, setShowEditForm] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { dog, isLoading, isError, message } = useSelector((state) => state.dogs);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      navigate(`/dogs/${id}`);
    } else {
      dispatch(getDog(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [isError, message, id, dispatch, navigate]);

  const onDelete = () => {
    dispatch(deleteDog(id));
    navigate('/dogs');
  };

  const onUpdate = () => {
    setShowEditForm(prevState => !prevState);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6 md:px-0 relative'>
      {showEditForm && <EditDogForm dog={dog} onUpdate={onUpdate} />}
      <div className='flex flex-col m-6 items-center rounded-md border-solid border max-w-2xl mx-auto shadow-md'>
        <img 
          src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGRvZ3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" 
          alt=""
          className='rounded-t-md object-cover w-full' 
          />
        <div className='flex flex-col gap-y-3 items-center mt-2'>
          <h2 className='text-3xl font-bold'>{dog.name}</h2>
          <h3 className='text-xl text-gray-500'><span className='font-bold'>FurParent:</span> {dog.author?.username}</h3>
          <div className='text-lg text-center flex flex-col gap-y-2'>
            <p>{dog.age} yrs. old</p>
            <p>{dog.breed}</p>
            <p>{dog.location}</p>
            <p className='border-t-2 pt-2'>{dog.description}</p>
          </div>
          <div className='mb-2 flex space-x-4'>
            {(user && (user.id === (dog.author?._id || dog.author))) && (
              <>
                <Button variant="outlined" color='success' startIcon={<EditIcon />} onClick={onUpdate}>
                  {showEditForm ? 'Cancel Update' : 'Edit'}
                </Button>
                <Button variant="outlined" color='error' startIcon={<DeleteIcon />} onClick={onDelete}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DogProfile;