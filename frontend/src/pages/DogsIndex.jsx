import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getDogs, reset } from '../features/dogs/dogSlice';
import { toast } from 'react-toastify';
import Dog from '../components/Dog';
import Loading from '../components/Loading';

function DogsIndex() {

  const dispatch = useDispatch();

  const { dogs, isLoading, isError, message } = useSelector((state) => state.dogs);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getDogs());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='container mx-auto px-6'>
      <div className='grid grid-cols-1 gap-4 my-6 justify-items-center md:grid-cols-2 lg:grid-cols-3'>
        {dogs.map(dog => (
          <Dog key={dog._id} dog={dog} />
        ))}
      </div>
    </div>
  );
}

export default DogsIndex;