import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification simple pour l'email
    if (!email) {
      setError('Veuillez entrer votre email.');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer un email valide.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsLoading(true); // Activer le chargement
    alert("ok!!!!!!!!")
/*
    try {
      // Envoi de l'email au backend via une requête POST
      const response = await axios.post('http://localhost:5000/api/forget-password', { email });
      // Message de succès renvoyé par le backend
      setSuccessMessage(response.data.message);
      setEmail(''); // Réinitialiser l'email après envoi
    } catch (error) {
      setError('Erreur lors de l\'envoi de l\'email de réinitialisation.');
      console.error(error);
    } finally {
      setIsLoading(false); // Désactiver le chargement après la réponse
    }
      */
     
  };

  const handleReset = () => {
    setEmail('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        {/* Image en haut */}
        <div className="text-center mb-3">
          <img
            src="/image/img2.jpg" alt="Reset Password"
            className="img-fluid rounded-circle"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        </div>

        <h2 className="text-center">Reset Password</h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email" className={`form-control ${error ? 'is-invalid' : ''} ${successMessage ? 'is-valid' : ''}`}
               placeholder="Enter your registered email"value={email} onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="invalid-feedback">{error}</div>}
            {successMessage && <div className="valid-feedback">{successMessage}</div>}
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-warning" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset</button>
          </div>

        </form>

        {/* Lien pour retourner à la connexion */}
        <p className="text-center mt-3">
          Remembered your password? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
