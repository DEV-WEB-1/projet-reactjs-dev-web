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
        type: "Router",
        status: "On",
        "room-name": "general",
        settings: {
          ssid: "general-router",
          password: "0000",
        },
      },
      {
        name: "general-compteur",
        type: "Power Meter",
        status: "On",
        "room-name": "general",
        settings: { total: 200, "this-month": 50 },
      },
      {
        name: "general-camera",
        type: "Camera",
        status: "On",
        "room-name": "general",
        settings: {},
      },
      {
        name: "general-movement-detector",
        type: "Movement Detector",
        status: "On",
        "room-name": "general",
        settings: {},
      },
      {
        name: "general-temperature-sensor",
        type: "Temperature Detector",
        status: "Off",
        "room-name": "general",
        settings: { temperature: 24 },
      },
      {
        name: "general-humidity-sensor",
        type: "Humidity Detector",
        status: "Off",
        "room-name": "general",
        settings: { humidity: 60 },
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
