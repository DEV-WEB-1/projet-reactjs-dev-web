const express = require("express");
const connectDB = require("./config/db");
const houseRoutes = require("./routes/houseRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());

// Définir les routes
app.use("/api/houses", houseRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
