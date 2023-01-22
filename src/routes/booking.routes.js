const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

const endpoint = "/bookings";

router.get(endpoint, bookingController.getAll);
router.get(`${endpoint}/:id`, bookingController.getOne);
router.post(endpoint, bookingController.create);
router.patch(`${endpoint}/:id`, bookingController.update);
router.delete(`${endpoint}/:id`, bookingController.delete);

module.exports = router;
