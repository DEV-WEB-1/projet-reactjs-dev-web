const express = require("express");
const houseController=require("../controllers/houseController");
const router = express.Router();

router.get("/", houseController.getAllHouses);
router.post("/creatHouse", houseController.creatHouse);
router.get("/getHouse", houseController.getHouse);
router.put("/updateHouse", houseController.updateHouse);


module.exports = router;
