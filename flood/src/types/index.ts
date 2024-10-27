export interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  district: string;
  state: 'Telangana' | 'Andhra Pradesh';
  department: string;
}

export interface Alert {
  id: string;
  timestamp: string;
  type: 'Flood' | 'Landslide' | 'Heavy Rainfall';
  severity: 'Low' | 'Medium' | 'High';
  location: {
    district: string;
    state: 'Telangana' | 'Andhra Pradesh';
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
}

export interface PredictionData {
  rainfall: number;
  soilMoisture: number;
  waterLevel: number;
  prediction: {
    type: Alert['type'];
    probability: number;
    severity: Alert['severity'];
  };
}