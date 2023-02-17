const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const endpoint = "/shops";

router.get(endpoint, shopController.getAll);
router.get(`${endpoint}/:id`, authMiddleware, shopController.getOne);
router.post(endpoint, authMiddleware, shopController.create);
router.patch(`${endpoint}/:id`, authMiddleware, shopController.update);
router.delete(`${endpoint}/:id`, authMiddleware, shopController.delete);

module.exports = router;
