const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const endpoint = "/auth";

router.post(`${endpoint}/login`, AuthController.login);
router.post(`${endpoint}/register`, AuthController.register);
router.post(`${endpoint}/forgot-password`, AuthController.forgotPassword);
router.post(`${endpoint}/reset-password/:id`, AuthController.resetPassword);

module.exports = router;
