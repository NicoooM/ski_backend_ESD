const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");

const endpoint = "/comments";

router.get(endpoint, commentController.getAll);
router.get(`${endpoint}/:id`, commentController.getOne);
router.post(endpoint, commentController.create);
router.patch(`${endpoint}/:id`, commentController.update);
router.delete(`${endpoint}/:id`, commentController.delete);

module.exports = router;
