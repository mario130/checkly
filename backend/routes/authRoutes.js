const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.get("/getAll", authController.getAll);
router.get("/getById", authController.getById);
router.post("/auth", authController.authenticate);

module.exports = router;
