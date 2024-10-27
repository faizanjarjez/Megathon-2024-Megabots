import { predict } from '../ml/model.js';
import { getWaterData, getSoilMoisture } from './earthEngine.js';

export const predictFloodRisk = async (region) => {
  try {
    // Get environmental data from Earth Engine
    const [waterData, soilMoisture] = await Promise.all([
      getWaterData(region),
      getSoilMoisture(region),
    ]);

    // Prepare input features
    const features = [
      waterData.precipitation,
      waterData.waterOccurrence,
      waterData.slope,
      soilMoisture,
    ];

    // Make prediction using Python script
    const prediction = await predict(features);

    return {
      type: 'Flood',
      probability: prediction.probability,
      severity: prediction.probability > 0.7 ? 'High' : 
                prediction.probability > 0.4 ? 'Medium' : 'Low',
    };
  } catch (error) {
    console.error('Error making prediction:', error);
    throw error;
  }
};