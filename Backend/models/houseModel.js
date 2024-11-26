const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "router", "camera", etc.
  status: { type: String, default: "off" }, // e.g., "on", "off", "active"
  "room-name": { type: String, required: true },
  settings: { type: Object, default: {} }, // Dynamic object for settings
}, { _id: false });

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., "general", "kitchen", etc.
  devices: { type: [deviceSchema], default: [] },
}, { _id: false });

const houseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rooms: { type: [roomSchema], default: [] },
},{ versionKey: false });

module.exports = mongoose.model("House", houseSchema,"houses");
