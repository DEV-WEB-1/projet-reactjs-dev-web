const express = require("express");
const connectDB = require("./config/db");
const houseRoutes = require("./routes/houseRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

require("dotenv").config();

const app = express();
app.use(session({
    secret:"Al8x@*k!2", 
    resave: false,
    saveUninitialized: true,
}))
connectDB();

app.use(express.json());

// Définir les routes
app.use("/api/houses", houseRoutes);
app.use("/api/users", userRoutes);
app.get("/session", (req, res) => {console.log(req.session); res.send("Session")});

module.exports = app;
