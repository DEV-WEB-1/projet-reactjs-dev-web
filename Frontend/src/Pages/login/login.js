import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import userService from '../../services/UserServices';

function Login({ setUser }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    let validationErrors = {};

    // Simple validation
    if (!email) validationErrors.email = 'Veuillez entrer votre email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      validationErrors.email = 'Veuillez entrer un email valide.';

    if (!password) validationErrors.password = 'Veuillez entrer un mot de passe.';
    else if (password.length < 6)
      validationErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const user = await userService.getUser(email, password);

        if (user) {
          console.log('Connected successfully');
          setUser(user); // Update user in parent state
          navigate('/houses'); // Redirect to home page
        } else {
          console.log(user.message);
          validationErrors.email = 'Connexion impossible. Veuillez verifier vos identifiants.';
          setErrors(validationErrors);
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        alert('Une erreur est survenue lors de la connexion');
      }
    }
  };

  const handleReset = () => {
    setFormData({ email: '', password: '' });
    setErrors({});
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <div className="text-center mb-3">
          <img
            src="/image/img1.jpg"
            alt="Login"
            className="img-fluid rounded-circle"
            style={{ width: '150px', height: '150px' }}
          />
        </div>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
        <p className="mt-3 text-center">
          <Link to="/forget-password">Forgot password?</Link>
        </p>
        <p className="text-center">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
