import React, { useState } from 'react';
import { Search, Calendar, AlertCircle } from 'lucide-react';
import BaseDashboard from '../BaseDashboard';
import { useLottoParticipants } from '../../../hooks/useLottoParticipants';
import LoadingState from '../../../components/LoadingState';
import ParticipantsList from '../../../components/agent/ParticipantsList';

export default function LottoParticipants() {
  const { participants, loading, error } = useLottoParticipants();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  if (loading) {
    return (
      <BaseDashboard title="Participations Lotto">
        <LoadingState message="Chargement des participations..." />
      </BaseDashboard>
    );
  }

  return (
    <BaseDashboard title="Participations Lotto">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="w-full md:w-48">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <ParticipantsList 
        participants={participants}
        searchTerm={searchTerm}
        dateFilter={dateFilter}
      />
    </BaseDashboard>
  );
}