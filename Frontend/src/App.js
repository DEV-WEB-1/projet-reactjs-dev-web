import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login/login';
import Register from './login/register';
import ForgetPassword from './login/forgetpass';
import Home from './home/home';

function App() {
  return (
    <Router>
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
