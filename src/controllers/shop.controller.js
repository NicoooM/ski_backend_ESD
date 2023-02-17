const Shop = require("../models/shop.model");
const User = require("../models/user.model");

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
      const user = req.user.id;
      const isOwner = shop.user.toString() === user;
      if (!isOwner) {
        res.status(401).send({ message: "You are not the owner" });
      } else {
        res.status(200).send(shop);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },

  create: async (req, res) => {
    try {
      const user = req.user.id;
      const userInDb = await User.findById(user);
      if (userInDb.shop) {
        return res.status(401).send({ message: "You already have a shop" });
      }
      const shop = await Shop.create({ ...req.body, user });
      await User.findByIdAndUpdate(user, { shop: shop._id });
      res.status(201).send(shop);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  update: async (req, res) => {
    try {
      const user = req.user.id;
      const isOwner = shop.user.toString() === user;
      if (!isOwner) {
        res.status(401).send({ message: "You are not the owner" });
      }
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
      const user = req.user.id;
      const isOwner = shop.user.toString() === user;
      if (!isOwner) {
        return res.status(401).send({ message: "You are not the owner" });
      }
      await Shop.findByIdAndDelete(req.params.id);

      res.status(200).send({ message: "Shop deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = shopController;
