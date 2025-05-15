import React from 'react';

export default function TestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Image Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Mine Entrance Image</h2>
          <img 
            src="/images/KHEWRA SALT MINE.webp" 
            alt="Mine Entrance"
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <p className="mt-2 text-gray-600">File: KHEWRA SALT MINE.webp</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Natural Salt Chamber</h2>
          <img 
            src="/images/KHEWRA SALT MINE IMAGES.jpg" 
            alt="Natural Salt Chamber"
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <p className="mt-2 text-gray-600">File: KHEWRA SALT MINE IMAGES.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Illuminated Walkway</h2>
          <img 
            src="/images/KHEWRA SALT MINE.jpg" 
            alt="Illuminated Walkway"
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <p className="mt-2 text-gray-600">File: KHEWRA SALT MINE.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Layered Salt Formations</h2>
          <img 
            src="/images/Khewra-Salt-Mine-1024.jpg" 
            alt="Layered Salt Formations"
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <p className="mt-2 text-gray-600">File: Khewra-Salt-Mine-1024.jpg</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Crystal Palace Tunnel</h2>
          <img 
            src="/images/108.webp" 
            alt="Crystal Palace Tunnel"
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <p className="mt-2 text-gray-600">File: 108.webp</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Mine Entrance (Original)</h2>
          <img 
            src="/images/KHEWRA SALT MINE001.jpg" 
            alt="Mine Entrance Original"
            className="w-full h-64 object-cover rounded-lg shadow-md" 
          />
          <p className="mt-2 text-gray-600">File: KHEWRA SALT MINE001.jpg</p>
        </div>
      </div>
    </div>
  );
}