const Post = require("../models/post.model");
const Shop = require("../models/shop.model");

const postController = {
  getAll: async (req, res) => {
    try {
      const search = req.query.search || "";
      const minWeight = req.query.minWeight || 0;
      const maxWeight = req.query.maxWeight || 1000;
      const size = Number(req.query.size) || "";
      let style = req.query.style || "";
      let onlyAvailable = req.query.onlyAvailable || false;

      if (style === "All") {
        style = "";
      }

      const query = {
        title: { $regex: search, $options: "i" },
        weight: { $gte: minWeight, $lte: maxWeight },
        style: { $regex: style, $options: "i" },
      };

      if (size && size !== 0) {
        query.size = size;
      }

      if (onlyAvailable === "true") {
        query.isAvailable = true;
      }

      const posts = await Post.find(query)
        .populate("comments")
        .populate("bookings");

      res.status(200).send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate("comments");
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send({ message: "Can't get post" });
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
      res.status(400).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send({ message: "Can't update post" });
    }
  },

  delete: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Post deleted" });
    } catch (error) {
      res.status(400).send({ message: "Can't delete post" });
    }
  },
};

module.exports = postController;
