import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './Pages/login/login';
import Register from './Pages/login/register';
import ForgetPassword from './Pages/login/forgetpass';
import Home from './Pages/home/home';
import AddRoom from './Pages/Add Room/AddRoom';
import UserProfile from './Pages/login/UserProfile';
import Houses from './Pages/houses/houses';
import Room from './Pages/Room/roomPage';

function App() {
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const [activeHouse, setActiveHouse] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route 
          path="/houses" 
          element={<Houses 
          houses={houses}
          user={user}
          setUser={setUser}
          setHouses={setHouses}
          setActiveHouse={setActiveHouse}
          setIsLoading={setIsLoading} />} />
        <Route
          path="/home"
          element={
            <Home
              user={user}
              setUser={setUser}
              houses={houses}
              setHouses={setHouses}
              activeHouse={activeHouse}
              setActiveHouse={setActiveHouse}
              setRooms={setRooms}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          path="/add-room"
          element={
            <AddRoom
              user={user}
              houses={houses}
              activeHouse={activeHouse}
              setActiveHouse={setActiveHouse}
              rooms={rooms}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/room/:roomName" 
          element={<Room 
          user={user}
          houses={houses}
          activeHouse={activeHouse}
          setActiveHouse={setActiveHouse}
          rooms={rooms}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          />} />
      </Routes>
    </Router>
  );
}

export default App;
