import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DogProfile from './pages/DogProfile';
import DogsIndex from './pages/DogsIndex';
import Login from './pages/Login';
import Register from './pages/Register';
import NewDogForm from './pages/NewDogForm';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/dogs' element={<DogsIndex />}/>
          <Route path='/dogs/new' element={<NewDogForm />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/dogs/:id' element={<DogProfile />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
