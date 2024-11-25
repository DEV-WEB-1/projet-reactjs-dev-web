const houseService = require("../services/houseService");

exports.getAllHouses = async (req, res) => {
  try {
    const houses = await houseService.getAllHouses();
    res.status(200).json(houses);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des maisons." });
  }
};

exports.addHouse = async (req, res) => {
  try {
    const house = await houseService.addHouse(req.body);
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la maison." });
  }
};

exports.getHouseById = async (req, res) => {
  try {
    const house = await houseService.getHouseById(req.params.id);
    if (!house) return res.status(404).json({ message: "Maison non trouvée." });
    res.status(200).json(house);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la maison." });
  }
};
