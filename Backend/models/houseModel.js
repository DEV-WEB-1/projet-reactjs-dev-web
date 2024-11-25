const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  _id: String,
  name: String,
  type: String, // light, thermostat, etc.
  status: String, // on, off, etc.
  room_id: String,
  settings: mongoose.Schema.Types.Mixed, // Champs dynamiques comme brightness
});

const roomSchema = new mongoose.Schema({
  _id: String,
  name: String,
  type: String, // living_room, bedroom, etc.
  devices: [deviceSchema],
});

const houseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  rooms: [roomSchema], 
},
{ versionKey: false }
);

module.exports = mongoose.model("House", houseSchema);
