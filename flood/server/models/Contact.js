import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  district: { type: String, required: true },
  state: { 
    type: String, 
    enum: ['Telangana', 'Andhra Pradesh'],
    required: true 
  },
  department: { type: String, required: true },
}, { timestamps: true });

export const Contact = mongoose.model('Contact', contactSchema);