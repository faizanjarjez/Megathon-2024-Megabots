import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ee from '@google/earthengine';
import fetch from 'node-fetch';
import { connectDB } from './config/db.js';
import { predictionRouter } from './routes/prediction.js';
import { alertRouter } from './routes/alert.js';
import { contactRouter } from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Google Earth Engine
const initializeEE = async () => {
  try {
    const PRIVATE_KEY = process.env.GEE_PRIVATE_KEY.replace(/\\n/g, '\n');
    await ee.data.authenticateViaPrivateKey(JSON.parse(PRIVATE_KEY));
    ee.initialize();
    console.log('Google Earth Engine initialized successfully');
  } catch (error) {
    console.error('Error initializing Google Earth Engine:', error);
  }
};

// Routes
app.use('/api/predictions', predictionRouter);
app.use('/api/alerts', alertRouter);
app.use('/api/contacts', contactRouter);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await initializeEE();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();