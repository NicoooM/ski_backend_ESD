const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const commentController = {
  getAll: async (req, res) => {
    try {
      const comments = await Comment.find();
      res.status(200).send(comments);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.status(200).send(comment);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const comment = await Comment.create(req.body);
      await Post.findByIdAndUpdate(comment.post, {
        $push: { comments: comment._id },
      });
      res.status(201).send(comment);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(comment);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Comment deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = commentController;
