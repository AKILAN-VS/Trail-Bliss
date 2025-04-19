const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://trail_user:prakki_akil@london.686fpp6.mongodb.net/UserBookings?retryWrites=true&w=majority&appName=London')
  .then(() => console.log('✅ Connected to MongoDB Atlas via Mongoose'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  travellerType: { type: String, required: true },
  travellerCount: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/bookings', async (req, res) => {
  try {
    const { x, y, z, a, b, c } = req.body;

    const newBooking = new Booking({
      name: x,
      email: y,
      phoneNumber: z,
      address: a,
      travellerType: b,
      travellerCount: c
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking saved', id: newBooking._id });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Error saving booking' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
