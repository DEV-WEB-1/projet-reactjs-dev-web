const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/register", userController.addUser);
router.post("/login", userController.getUser);
router.post("/check-email", userController.checkEmailValidity);
router.patch("/update-password", userController.updatePassword);
router.get("/getUserHouses", userController.getUserHouses);
router.put("/updateUser", userController.updateUser);


module.exports = router;
