import React from 'react';
import { Header } from './components/Header';
import { Map } from './components/Map';
import { Dashboard } from './components/Dashboard';
import { AlertList } from './components/AlertList';
import { ContactForm } from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Map />
            <Dashboard />
            <AlertList />
          </div>
          
          <div className="lg:col-span-1">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;