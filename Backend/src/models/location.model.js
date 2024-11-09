
const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    type: { type: String, required: true }, // 'user' or 'bicycle'
    userId: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Location', locationSchema);