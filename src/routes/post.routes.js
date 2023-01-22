const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

const endpoint = "/posts";

router.get(endpoint, postController.getAll);
router.get(`${endpoint}/:id`, postController.getOne);
router.post(endpoint, postController.create);
router.patch(`${endpoint}/:id`, postController.update);
router.delete(`${endpoint}/:id`, postController.delete);

module.exports = router;
