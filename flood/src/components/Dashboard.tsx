import React from 'react';
import { CloudRain, Droplets, Waves, AlertTriangle } from 'lucide-react';
import type { PredictionData } from '../types';

const SAMPLE_DATA: PredictionData = {
  rainfall: 150,
  soilMoisture: 85,
  waterLevel: 12.5,
  prediction: {
    type: 'Flood',
    probability: 0.85,
    severity: 'High'
  }
};

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rainfall (mm)</p>
              <p className="text-2xl font-semibold mt-1">{SAMPLE_DATA.rainfall}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CloudRain className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-blue-100 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${(SAMPLE_DATA.rainfall / 200) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Soil Moisture (%)</p>
              <p className="text-2xl font-semibold mt-1">{SAMPLE_DATA.soilMoisture}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Droplets className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-green-100 rounded-full">
              <div
                className="h-full bg-green-600 rounded-full"
                style={{ width: `${SAMPLE_DATA.soilMoisture}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Water Level (m)</p>
              <p className="text-2xl font-semibold mt-1">{SAMPLE_DATA.waterLevel}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Waves className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-purple-100 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${(SAMPLE_DATA.waterLevel / 15) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {SAMPLE_DATA.prediction && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Current Prediction</h2>
          <div className="flex items-center space-x-4">
            <div className={`h-16 w-16 rounded-full flex items-center justify-center ${
              SAMPLE_DATA.prediction.severity === 'High' ? 'bg-red-100' :
              SAMPLE_DATA.prediction.severity === 'Medium' ? 'bg-yellow-100' :
              'bg-blue-100'
            }`}>
              <AlertTriangle className={`h-8 w-8 ${
                SAMPLE_DATA.prediction.severity === 'High' ? 'text-red-600' :
                SAMPLE_DATA.prediction.severity === 'Medium' ? 'text-yellow-600' :
                'text-blue-600'
              }`} />
            </div>
            <div>
              <h3 className="font-medium">{SAMPLE_DATA.prediction.type}</h3>
              <p className="text-sm text-gray-600">
                Probability: {(SAMPLE_DATA.prediction.probability * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-gray-600">
                Severity: {SAMPLE_DATA.prediction.severity}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};