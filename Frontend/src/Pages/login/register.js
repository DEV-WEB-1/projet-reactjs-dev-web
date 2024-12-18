import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../../services/UserServices'; // Import userService

function Register() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', gender: '', image: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: e.target.value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, gender, image } = formData;

    let validationErrors = {};

    // Validation
    if (!fullName) validationErrors.fullName = 'Veuillez entrer votre nom complet.';
    if (!email) validationErrors.email = 'Veuillez entrer votre email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) validationErrors.email = 'Veuillez entrer un email valide.';
    if (!password) validationErrors.password = 'Veuillez créer un mot de passe.';
    else if (password.length < 6) validationErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    if (!gender) validationErrors.gender = 'Veuillez sélectionner votre genre.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Prepare the user data
        const formData = {
          name : fullName,
          email : email,
          password : password,
          gender : gender
        };

        if (image !== '') {
          formData.image = image;
        }

        // Add user using userService
        const response = await userService.addUser(formData);

        if (response) {
          // Redirect to the login page after registration
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        alert("Erreur lors de l'inscription");
      }
    }
  };

  const handleReset = () => {
    setFormData({ fullName: '', email: '', password: '', gender: '', image: null });
    setErrors({});
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        {/* Image en haut */}
        <div className="text-center mb-3">
          <img src="/image/img1.jpg" alt="Register" className="img-fluid" style={{ width: '100px', height: '100px' }} />
        </div>

        <h2 className="text-center">Register</h2>

        <form onSubmit={handleSubmit}>
          {/* Champ Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>

          {/* Champ Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter your email"
              value={formData.email} onChange={handleChange} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Champ Password */}
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Create a password" value={formData.password} onChange={handleChange} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Champ Gender */}
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" className={`form-control ${errors.gender ? 'is-invalid' : ''}`} value={formData.gender}
              onChange={handleChange}>
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          {/* Champ Image (si nécessaire) */}
          <div className="form-group">
            <label>Profile Image</label>
            <input type="text" name="image" className="form-control" onChange={handleChange} />
          </div>

          {/* Boutons */}
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-success">Register</button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>
        </form>

        {/* Lien pour retourner à la connexion */}
        <p className="text-center mt-3">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
