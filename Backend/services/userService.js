const User = require("../models/userModel");

// Service pour récupérer tous les utilisateurs
exports.getAllUsers = async () => {
  return await User.find();
};

// Service pour ajouter un utilisateur
exports.addUser = async (userData) => {
  // Crée un utilisateur avec des champs par défaut pour admin et invited
  const user = new User({
    ...userData,
    admin: [], // Liste vide par défaut
    invited: [], // Liste vide par défaut
  });
  return await user.save();
};


// Service pour récupérer un utilisateur par eamil et password
exports.getUser= async (emailInput,passwordInput) => {
  return await User.findOne({email:emailInput,password:passwordInput});
};

exports.updateUserImage = async (userId, imageUrl) => {
  return await User.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });
};
exports.checkEmailValidity = async (emailInput) => {
  try {
    const user = await User.findOne({ email: emailInput });
    return !!user; // Retourne true si l'utilisateur existe, sinon false
  } catch (error) {
    console.error("Erreur lors de la vérification de l'email :", error);
    return false; // En cas d'erreur, on retourne false par sécurité
  }
};
exports.updateUserPassword = async (email, newPassword) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email }, // Trouver l'utilisateur par email
      { password: newPassword }, // Mettre à jour le mot de passe
      { new: true } // Retourner le document mis à jour
    );

    return updatedUser ? true : false; // Retourne true si la mise à jour a réussi, sinon false
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    return false; // En cas d'erreur, retourne false
  }
};


