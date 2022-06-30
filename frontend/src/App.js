import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DogProfile from './pages/DogProfile';
import DogsIndex from './pages/DogsIndex';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/dogs' element={<DogsIndex />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/dogs/:id' element={<DogProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
