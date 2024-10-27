import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import type { Alert } from '../types';

const SAMPLE_ALERTS: Alert[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    type: 'Flood',
    severity: 'High',
    location: {
      district: 'Warangal',
      state: 'Telangana',
      coordinates: { lat: 17.9689, lng: 79.5941 }
    },
    status: 'Pending',
    description: 'High probability of flooding due to increased rainfall and water levels.'
  },
  {
    id: '2',
    timestamp: new Date().toISOString(),
    type: 'Heavy Rainfall',
    severity: 'Medium',
    location: {
      district: 'Vishakhapatnam',
      state: 'Andhra Pradesh',
      coordinates: { lat: 17.6868, lng: 83.2185 }
    },
    status: 'Approved',
    description: 'Continuous heavy rainfall predicted for the next 24 hours.'
  }
];

export const AlertList = () => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Recent Alerts</h2>
      </div>
      
      <div className="divide-y">
        {SAMPLE_ALERTS.map((alert) => (
          <div key={alert.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === 'High' ? 'text-red-500' :
                    alert.severity === 'Medium' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <h3 className="font-medium">{alert.type}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    alert.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    alert.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {alert.status}
                  </span>
                </div>
                
                <p className="mt-1 text-sm text-gray-600">
                  {alert.description}
                </p>
                
                <div className="mt-2 text-sm text-gray-500">
                  <span>{alert.location.district}, {alert.location.state}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                </div>
              </div>
              
              {alert.status === 'Pending' && (
                <div className="flex space-x-2">
                  <button className="p-1 rounded-full hover:bg-green-100 text-green-600">
                    <Check className="h-5 w-5" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-red-100 text-red-600">
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};