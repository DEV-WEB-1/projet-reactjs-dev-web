const House = require("../models/houseModel");

// Service pour récupérer toutes les maisons
exports.getAllHouses = async () => {
  return await House.find();
};

// Service pour ajouter une maison
exports.addHouse = async (houseData) => {
  const house = new House(houseData);
  return await house.save();
};

// Service pour récupérer une maison par ID
exports.getHouseById = async (houseId) => {
  return await House.findById(houseId);
};
