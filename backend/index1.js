/*eslint-disable*/ 
const express = require("express");
const connectDB = require("./db");
const mongoose = require('mongoose');

const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Define Mongoose schemas and models
const categorySchema = new mongoose.Schema({
  name: String,
  backgroundColor: { hex: String },
  iconUrl: { url: String },
});

const businessSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: String,
  category: String,
  contactPerson: String,
  email: String,
  images: [{ url: String }],
});

const bookingSchema = new mongoose.Schema({
  businessId: mongoose.Schema.Types.ObjectId,
  date: String,
  time: String,
  userEmail: String,
  userName: String,
  status: String,
});

const Category = mongoose.model("Category", categorySchema);
const Business = mongoose.model("Business", businessSchema);
const Booking = mongoose.model("Booking", bookingSchema);

// Categories
app.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

app.post("/categories", async (req, res) => {
  const { name, backgroundColor, iconUrl } = req.body;

  if (!name || !backgroundColor || !iconUrl) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newCategory = new Category({ name, backgroundColor, iconUrl });
  await newCategory.save();
  res.status(201).json(newCategory);
});

// Businesses
app.get("/businesses", async (req, res) => {
  const businesses = await Business.find();
  res.json(businesses);
});

app.get("/businesses/category/:category", async (req, res) => {
  const category = req.params.category;
  const filteredBusinesses = await Business.find({
    category: new RegExp(category, "i"),
  });
  res.json(filteredBusinesses);
});

app.get("/businesses/:id", async (req, res) => {
  const businessId = req.params.id;
  const business = await Business.findById(businessId);

  if (!business) {
    return res.status(404).json({ error: "Business not found" });
  }

  res.json(business);
});

app.post("/businesses", async (req, res) => {
  const {
    name,
    description,
    address,
    category,
    contactPerson,
    email,
    images,
  } = req.body;

  if (
    !name ||
    !description ||
    !address ||
    !category ||
    !contactPerson ||
    !email ||
    !images
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newBusiness = new Business({
    name,
    description,
    address,
    category,
    contactPerson,
    email,
    images,
  });
  await newBusiness.save();
  res.status(201).json(newBusiness);
});

app.put("/businesses/:id", async (req, res) => {
  const {
    name,
    description,
    address,
    category,
    contactPerson,
    email,
    images,
  } = req.body;
  const businessId = req.params.id;

  const updatedBusiness = await Business.findByIdAndUpdate(
    businessId,
    { name, description, address, category, contactPerson, email, images },
    { new: true }
  );

  if (!updatedBusiness) {
    return res.status(404).json({ error: "Business not found" });
  }

  res.json(updatedBusiness);
});

// Bookings
app.get("/bookings/user/:email", async (req, res) => {
  const email = req.params.email;
  const userBookings = await Booking.find({ userEmail: email });
  res.json(userBookings);
});

app.post("/bookings", async (req, res) => {
  const { businessId, date, time, userEmail, userName, status } = req.body;

  if (
    !businessId ||
    !date ||
    !time ||
    !userEmail ||
    !userName ||
    !status
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newBooking = new Booking({
    businessId,
    date,
    time,
    userEmail,
    userName,
    status,
  });
  await newBooking.save();
  res.status(201).json(newBooking);
});

app.get("/businesses/:businessId/bookings/date/:date", async (req, res) => {
  const { businessId, date } = req.params;
  const businessBookings = await Booking.find({ businessId, date });
  res.json(businessBookings);
});

app.delete("/bookings/:id", async (req, res) => {
  const bookingId = req.params.id;
  const deletedBooking = await Booking.findByIdAndDelete(bookingId);

  if (!deletedBooking) {
    return res.status(404).json({ error: "Booking not found" });
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
