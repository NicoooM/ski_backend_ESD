const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");

const endpoint = "/shops";

router.get(endpoint, shopController.getAll);
router.get(`${endpoint}/:id`, shopController.getOne);
router.post(endpoint, shopController.create);
router.patch(`${endpoint}/:id`, shopController.update);
router.delete(`${endpoint}/:id`, shopController.delete);

module.exports = router;
