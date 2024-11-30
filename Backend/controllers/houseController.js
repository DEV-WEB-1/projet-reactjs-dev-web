const session = require("express-session");
const houseService = require("../services/houseService");

exports.getAllHouses = async (req, res) => {
  try {
    const houses = await houseService.getAllHouses();
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des maisons." });
  }
};

exports.creatHouse = async (req, res) => {
  try {
    const house = await houseService.creatHouse(req.body);
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la maison.", error });
  }
};


exports.getHouse = async (req, res) => {
  try {
    const house = await houseService.getHouse(req.body.id);
    req.session.house_id = house._id;
    console.log(req.session);
    if (!house) return res.status(404).json({ message: "Maison non trouvée." });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la maison." });
  }
};

exports.updateHouse = async (req, res) => {
  try {
    const id= session.house_id;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ message: "L'ID de la maison est requis pour la mise à jour." });
    }

    const updatedHouse = await houseService.updateHouse(id, updatedData);
    if (!updatedHouse) {
      return res.status(404).json({ message: "Maison non trouvée." });
    }

    res.status(200).json(updatedHouse);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la maison.", error });
  }
};
