import express from 'express';
import { predictFloodRisk } from '../services/prediction.js';

const router = express.Router();

router.post('/predict', async (req, res) => {
  try {
    const { region } = req.body;
    const prediction = await predictFloodRisk(region);
    res.json(prediction);
  } catch (error) {
    console.error('Error in prediction route:', error);
    res.status(500).json({ error: 'Error making prediction' });
  }
});

export { router as predictionRouter };