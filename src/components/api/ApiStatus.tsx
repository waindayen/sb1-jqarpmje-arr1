import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';

interface ApiStatusProps {
  isConfigured: boolean;
  isOnline: boolean;
}

export default function ApiStatus({ isConfigured, isOnline }: ApiStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">État de la configuration</h2>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <p className="text-sm text-gray-600">
              {!isOnline ? 'Connexion impossible à Firestore' : 
               isConfigured ? 'API correctement configurée et opérationnelle' : 
               'API non configurée'}
            </p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${
          !isOnline ? 'bg-red-500' :
          isConfigured ? 'bg-green-500' : 
          'bg-yellow-500'
        }`} />
      </div>
    </div>
  );
}