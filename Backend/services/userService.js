const User = require("../models/userModel");
const House=require("../models/houseModel");

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
  try {
    const user = await User.findOne({email:emailInput,password:passwordInput});
    if(!user){
      throw new Error("User not found.");
    }
    return user;
  }
  catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

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

exports.getUserHouses = async (email) => {
  // Récupérer l'utilisateur par email
  const user = await User.findOne({ email });
  if (!user) throw new Error("Utilisateur non trouvé.");

  // Récupérer les maisons où l'utilisateur est admin
  const adminHouses = await House.find({ _id: { $in: user.admin } }, "_id name");

  // Récupérer les maisons où l'utilisateur est invité
  const invitedHouses = await House.find({ _id: { $in: user.invited } }, "_id name");

  return {
    adminHouses: adminHouses.map((house) => ({ id: house._id, nom: house.name })),
    invitedHouses: invitedHouses.map((house) => ({ id: house._id, nom: house.name })),
  };
};

exports.updateUser = async (email, updatedUserData) => {
  // Assurez-vous que l'email n'est pas modifiable
  delete updatedUserData.email;

  // Met à jour l'utilisateur correspondant à l'email
  return await User.findOneAndUpdate({ email }, updatedUserData, { new: true });
};
