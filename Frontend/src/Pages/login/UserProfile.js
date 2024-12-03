import React, { useState } from "react";
import "./UserProfile.css"; // Assurez-vous que le chemin est correct
function UserProfile() {
  // Données statiques pour le test du frontend
  const [userDetails, setUserDetails] = useState({
    id: 1,
    fullName: "Jean Dupont",
    email: "jean.dupont@example.com",
    address: "123 Rue Principale, Paris",
    profileImage: "/image/hayder2.jpg", // Image par défaut
  });

  const [allUsers] = useState([
    { id: 2, fullName: "Alice Martin", email: "alice.martin@example.com" },
    { id: 3, fullName: "Paul Durand", email: "paul.durand@example.com" },
    { id: 4, fullName: "Marie Curie", email: "marie.curie@example.com" },
  ]);

  const [message, setMessage] = useState("");

  // Simulation d'envoi d'invitation
  const sendInvitation = (friendId) => {
    setMessage(`Invitation envoyée à l'utilisateur ID ${friendId}`);
  };

  // Gestion de la modification de l'image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crée une URL locale pour prévisualiser l'image
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        profileImage: imageUrl,
      }));
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        {userDetails ? (
          <>
            <h2 className="text-center">Profil de l'utilisateur</h2>
            <div className="text-center mb-3">
              <img
                src={userDetails.profileImage}
                alt="Profil"
                className="rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            </div>
            <div className="text-center mb-4">
              <label htmlFor="uploadImage" className="btn btn-secondary btn-sm">
                Modifier l'image de profil
              </label>
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <div className="mb-3">
              <strong>Nom complet :</strong> {userDetails.fullName}
            </div>
            <div className="mb-3">
              <strong>Email :</strong> {userDetails.email}
            </div>
            <div className="mb-3">
              <strong>Adresse :</strong> {userDetails.address}
            </div>
            <h4 className="mt-4">Inviter un ami</h4>
            <ul className="list-group">
              {allUsers.map((user) =>
                user.id !== userDetails.id ? (
                  <li
                    key={user.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {user.fullName} - {user.email}
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => sendInvitation(user.id)}
                    >
                      Inviter
                    </button>
                  </li>
                ) : null
              )}
            </ul>
          </>
        ) : (
          <div>Chargement des détails de l'utilisateur...</div>
        )}
      </div>
      {message && (
        <div className="alert alert-success mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
