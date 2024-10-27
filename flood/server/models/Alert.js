import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Flood', 'Landslide', 'Heavy Rainfall'],
    required: true
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  },
  location: {
    district: { type: String, required: true },
    state: {
      type: String,
      enum: ['Telangana', 'Andhra Pradesh'],
      required: true
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  description: { type: String, required: true }
}, { timestamps: true });

export const Alert = mongoose.model('Alert', alertSchema);