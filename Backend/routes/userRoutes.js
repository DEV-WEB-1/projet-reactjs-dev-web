const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/register", userController.addUser);
router.get("/login", userController.getUser);
router.post("/check-email", userController.checkEmailValidity);
router.patch("/update-password", userController.updatePassword);
module.exports = router;
