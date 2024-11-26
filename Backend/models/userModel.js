const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
  admin: { type: [String], default: [] }, // Par défaut une liste vide
  invited: { type: [String], default: [] }, // Par défaut une liste vide
},
{ versionKey: false },{ _id: false }
);


module.exports = mongoose.model("User", userSchema, "users");
