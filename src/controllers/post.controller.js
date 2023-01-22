const Post = require("../models/post.model");
const Shop = require("../models/shop.model");

const postController = {
  getAll: async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const post = await Post.create(req.body);
      await Shop.findByIdAndUpdate(post.shop, {
        $push: { posts: post._id },
      });
      res.status(201).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Post deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = postController;
