import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement
  const [isEmailValid, setIsEmailValid] = useState(false); // Pour vérifier la validité de l'email

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de l'email
    if (!email) {
      setError('Veuillez entrer votre email.');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Veuillez entrer un email valide.');
      return;
    }

    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      // Vérifier si l'email existe
      const response = await axios.post('http://localhost:3000/api/users/check-email', { email });
      if (response.data.Valid) {
        setIsEmailValid(true);
        setError('');
      } else {
        setError('L\'email n\'existe pas. Veuillez vérifier votre adresse email.');
        setIsLoading(false);
        return;
      }

      // Si l'email est valide, demander un nouveau mot de passe
      if (isEmailValid) {
        if (!newPassword) {
          setError('Veuillez entrer un nouveau mot de passe.');
          setIsLoading(false);
          return;
        }

        // Envoi de la demande de mise à jour du mot de passe
        const updateResponse = await axios.patch('http://localhost:3000/api/users/update-password', { email, newPassword });
        if (updateResponse.data.success) {
          setSuccessMessage(updateResponse.data.message);
          setEmail('');
          setNewPassword('');
        } else {
          setError(updateResponse.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      setError('Erreur lors de la réinitialisation du mot de passe.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setNewPassword('');
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
              type="email"
              className={`form-control ${error ? 'is-invalid' : ''} ${successMessage ? 'is-valid' : ''}`}
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className="invalid-feedback">{error}</div>}
            {successMessage && <div className="valid-feedback">{successMessage}</div>}
          </div>

          {isEmailValid && (
            <div className="form-group mt-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter a new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          )}

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
