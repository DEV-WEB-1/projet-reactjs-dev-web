import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userService from "../../services/UserServices"; // Import du service utilisateur

function UserProfile({ user, setUser}) {
  const navigate = useNavigate();

  // États pour les champs utilisateur
  const [userDetails, setUserDetails] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    image: user.image || "/image/default.jpg",
    password: user.password,
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Gestion des champs utilisateur
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de l'upload d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserDetails((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // Soumission des changements
  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      // Mettre à jour les informations utilisateur
      const updatedUserData = { email: user.email, name: userDetails.name, gender: userDetails.gender };
      const updatedUser = await userService.updateUser(updatedUserData);
    
      // Mettre à jour le mot de passe si nécessaire
      if (userDetails.password.trim() !== "") {
        await userService.updatePassword(user.email, userDetails.password);
      }
    
      setMessage("Profil et mot de passe mis à jour avec succès !");
      
      // Mettre à jour l'objet 'user' dans le parent (App.js)
      setUser(updatedUser);  // Mise à jour du user dans le parent
    } catch (error) {
      setMessage("Une erreur est survenue : " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Retour à la page d'accueil
  const goHome = () => {
    navigate("/home");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Profil</h2>

        {/* Bouton retour à l'accueil */}
        <button className="btn btn-secondary btn-sm px-2 py-1 mb-3" onClick={goHome}>
         Retour à l'accueil
        </button>


        {/* Disposition horizontale de l'image et du nom */}
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="mr-3">
            <label htmlFor="uploadImage" className="btn btn-secondary btn-sm">
              Modifier l'image
            </label>
            <input
              type="file"
              id="uploadImage"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          <img
            src={userDetails.image}
            alt="Profil"
            className="rounded-circle"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </div>

        <div className="mb-3">
          <label>Email :</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userDetails.email}
            disabled
          />
        </div>

        {/* Champs modifiables */}
        <div className="mb-3">
          <label>Nom :</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Genre :</label>
          <select
            className="form-control"
            name="gender"
            value={userDetails.gender}
            onChange={handleChange}
          >
            <option value="">Sélectionner</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        {/* Champ pour afficher et modifier le mot de passe */}
        <div className="mb-3">
          <label>Mot de passe :</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={userDetails.password}
            onChange={handleChange}
          />
        </div>

        {/* Bouton de soumission */}
        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Mise à jour..." : "Mettre à jour le profil"}
          </button>
        </div>

        {/* Message de confirmation */}
        {message && (
          <div className="alert alert-success mt-3" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
