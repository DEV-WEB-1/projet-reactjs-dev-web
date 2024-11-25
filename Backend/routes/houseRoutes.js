const express = require("express");
const { getAllHouses, addHouse, getHouseById } = require("../controllers/houseController");
const router = express.Router();

router.get("/", getAllHouses);
router.post("/", addHouse);
router.get("/:id", getHouseById);

module.exports = router;
