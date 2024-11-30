import  { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';


function Login() {
  
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({email: '',password: ''});
  
  const history = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    const { email, password } = formData;

    let validationErrors = {};


    // Validation simple
    if (!email) validationErrors.email = 'Veuillez entrer votre email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      validationErrors.email = 'Veuillez entrer un email valide.';

    if (!password) validationErrors.password = 'Veuillez créer un mot de passe.';
    else if (password.length < 6)
      validationErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';

    setErrors(validationErrors);

    // Implémentation de la logique de connexion ici
    if (Object.keys(validationErrors).length === 0) {

      console.log('Login successful ');
      /*
      try {
        // Envoi des données au backend
        const response = await axios.post('http://localhost:5000/api/login', formData);
        alert(response.data.message);  // Message de succès ou erreur depuis le backend

        if (response.data.success) {
          // Redirection vers la page d'accueil après la connexion
          history('/home');
        }
      } catch (error) {
        console.error(error);
        alert('Invalid credentials');
      }
        */
    }
  };

  const handleReset = () => {setFormData({ email: '', password: '' });     setErrors({});};

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div className="card p-4" style={{ width: '400px' }}>

        {/* Image au centre haut */}
        <div className="text-center mb-3">
        <img src="/image/img1.jpg" alt="Login" className="img-fluid rounded-circle"
          style={{ width: '150px', height: '150px' }}
        />
        </div>

        <h2 className="text-center">Login</h2>

        <form onSubmit={handleLogin}>

        <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter your email"
              value={formData.email} onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
             placeholder="Create a password" value={formData.password} onChange={handleChange}
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
