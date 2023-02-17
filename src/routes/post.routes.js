const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const endpoint = "/posts";

router.get(endpoint, postController.getAll);
router.get(`${endpoint}/:id`, postController.getOne);
router.post(endpoint, authMiddleware, postController.create);
router.patch(`${endpoint}/:id`, authMiddleware, postController.update);
router.delete(`${endpoint}/:id`, authMiddleware, postController.delete);

module.exports = router;
