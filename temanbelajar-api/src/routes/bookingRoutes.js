const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const verifyToken = require("../middlewares/authMiddleware");

router.post("/", verifyToken, createBooking);

router.get("/", verifyToken, getBookings);

router.put("/:bookingId", verifyToken, updateBookingStatus);

module.exports = router;
