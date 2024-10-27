import React from 'react';
import { MapPin } from 'lucide-react';

export const Map = () => {
  return (
    <div className="relative h-[400px] bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')"
      }}>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Sample Alert Markers */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative group">
          <MapPin className="h-8 w-8 text-red-500 animate-bounce" />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
            <div className="bg-white rounded-lg shadow-lg p-2 text-sm">
              <p className="font-medium">High Flood Risk</p>
              <p className="text-gray-600">Warangal, Telangana</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};