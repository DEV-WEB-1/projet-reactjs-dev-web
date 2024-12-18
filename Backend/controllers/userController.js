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
    const { email, password, name, image, gender } = req.body;

    // Validation des champs obligatoires
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    // Appel au service pour ajouter l'utilisateur
    const newUser = await userService.addUser({ email, password, name, image, gender });
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
    req.session.user = user;
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
      res.status(200).json({ valid: false, message: "L'email n'existe pas." });
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
exports.getUserHouses = async (req, res) => {
  try {
    const email = req.session.user.email;

    if (!email) return res.status(400).json({ message: "Email requis." });

    const houses = await userService.getUserHouses(email);

    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const email = req.session.user.email;
    const updatedData = req.body;

    if (!email) {
      return res.status(400).json({ message: "L'email est requis pour la mise à jour." });
    }

    const updatedUser = await userService.updateUser(email, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error });
  }
};
exports.invite = async (req, res) => {
  try {
    const email = req.params.IvitedEmail;
    const updatedData = req.body;

    if (!email) {
      return res.status(400).json({ message: "L'email est requis pour la mise à jour." });
    }

    const updatedUser = await userService.updateUser(email, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur.", error });
  }
};


exports.getInvitedHouses = async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const invitedHouses = await userService.getInvitedHouses(email);

    if (!invitedHouses ) {
      return res.status(404).json({ message: "No invited houses found for this user." });
    }

    res.status(200).json(invitedHouses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invited houses.", error: error.message });
  }
};

