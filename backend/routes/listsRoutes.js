const express = require("express");
const router = express.Router();
const listsController = require("../controllers/listsController");
const verifyJwt = require("../middleware/verifyJwt");

router.get("/getLists", verifyJwt.verifyJwtToken, listsController.getUserLists);

module.exports = router;
