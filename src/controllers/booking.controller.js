const Booking = require("../models/booking.model");
const Post = require("../models/post.model");

const bookingController = {
  getAll: async (req, res) => {
    try {
      const { postId } = req.query;
      const bookings = await Booking.find({
        post: postId,
      });
      res.status(200).send(bookings);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      res.status(200).send(booking);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const booking = await Booking.create(req.body);
      await Post.findByIdAndUpdate(booking.post, {
        $push: { bookings: booking._id },
      });
      res.status(201).send(booking);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(booking);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Booking deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = bookingController;
