import React from 'react';
import { Bell, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold">Disaster Alert System</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center">
                3
              </span>
            </button>
            <div className="hidden lg:flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-sm font-medium">AD</span>
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};