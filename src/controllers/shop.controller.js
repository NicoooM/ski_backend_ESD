const Shop = require("../models/shop.model");

const shopController = {
  getAll: async (req, res) => {
    try {
      const shops = await Shop.find();
      res.status(200).send(shops);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getOne: async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id).populate({
        path: "posts",
        populate: [
          {
            path: "bookings",
          },
          {
            path: "comments",
          },
        ],
      });
      console.log(shop);
      res.status(200).send(shop);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const shop = await Shop.create(req.body);
      res.status(201).send(shop);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(200).send(shop);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Shop.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Shop deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = shopController;
