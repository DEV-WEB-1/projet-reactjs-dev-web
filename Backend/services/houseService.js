const House = require("../models/houseModel");
const User = require("../models/userModel");

// Service pour récupérer toutes les maisons
exports.getAllHouses = async () => {
  return await House.find();
};

// Service pour ajouter une maison

exports.creatHouse = async (houseData) => {
  const defaultRoom = {
    name: "general",
    type: "general",
    devices: [
      {
        name: "general-router",
        type: "router",
        status: "off",
        "room-name": "general",
        settings: {},
      },
      {
        name: "general-compteur",
        type: "compteur",
        status: "off",
        "room-name": "general",
        settings: { total: 0, "this-month": 0 },
      },
      {
        name: "general-camera",
        type: "camera",
        status: "off",
        "room-name": "general",
        settings: {},
      },
      {
        name: "general-movement-detector",
        type: "movement-detector",
        status: "off",
        "room-name": "general",
        settings: { movement: false },
      },
      {
        name: "general-temperature-sensor",
        type: "temperature-sensor",
        status: "off",
        "room-name": "general",
        settings: { temperature: 0 },
      },
      {
        name: "general-humidity-sensor",
        type: "humidity-sensor",
        status: "off",
        "room-name": "general",
        settings: { humidity: 0 },
      },
    ],
  };

  // Ajout de la pièce par défaut
  const houseWithDefaultRoom = {
    ...houseData,
    rooms: [defaultRoom],
  };

  const house = new House(houseWithDefaultRoom);
  return await house.save();
};


// Service pour récupérer une maison par ID
exports.getHouse = async (houseId) => {
  try {
    const house = await House.findById(houseId);
    if (!house) {
      throw new Error("House not found");
    }
    return house;
  } catch (error) {
    console.error("Error fetching house:", error);
    throw error;
  }
};


exports.updateHouse = async (id, updatedHouseData) => {
  // Met à jour la maison correspondant à l'id
  return await House.findByIdAndUpdate(id, updatedHouseData, { new: true });
};
