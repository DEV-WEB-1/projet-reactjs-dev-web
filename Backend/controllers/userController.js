const e = require("express");
const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs." });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { email, password, name, image } = req.body;

    // Validation des champs obligatoires
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    // Appel au service pour ajouter l'utilisateur
    const newUser = await userService.addUser({ email, password, name, image });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'utilisateur." });
  }
};

exports.getUser= async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUser(email, password);  
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé." });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur." });
  }
};
exports.checkEmailValidity = async (req, res) => {
  try {
    const { email } = req.body;
    const isEmailValid = await userService.checkEmailValidity(email);

    if (isEmailValid) {
      res.status(200).json({ valid: true, message: "L'email existe déjà." });
    } else {
      res.status(200).json({ valid: false, message: "L'email est disponible." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification de l'email." });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const isUpdated = await userService.updateUserPassword(email, newPassword);

    if (isUpdated) {
      res.status(200).json({ success: true, message: "Mot de passe mis à jour avec succès." });
    } else {
      res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du mot de passe." });
  }
};
