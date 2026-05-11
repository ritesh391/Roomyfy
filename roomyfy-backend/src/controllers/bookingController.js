import Booking from "../models/Booking.js";
import Property from "../models/Property.js";

// CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { propertyId, message } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      property: propertyId,
      message,
      status: "pending",
    });

    await booking.populate("property", "title location rent");
    await booking.populate("user", "name email");

    res.status(201).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MY BOOKINGS
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("property", "title location rent images")
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};