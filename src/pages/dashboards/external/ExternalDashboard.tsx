import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, TrendingUp, Clock, Ticket } from 'lucide-react';
import BaseDashboard from '../BaseDashboard';

export default function ExternalDashboard() {
  const stats = [
    { label: 'Paris en cours', value: '12', icon: Clock },
    { label: 'Participations Lotto', value: '3', icon: Trophy },
    { label: 'Gains totaux', value: '150€', icon: TrendingUp },
  ];

  const quickActions = [
    { 
      label: 'Mes participations', 
      path: '/dashboard/external/lotto-participants',
      icon: Ticket,
      description: 'Voir mes participations aux lottos'
    },
    { 
      label: 'Participer', 
      path: '/lotto',
      icon: Trophy,
      description: 'Participer à un nouveau tirage'
    }
  ];

  return (
    <BaseDashboard title="Mon Tableau de bord">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-100 rounded-lg">
                <action.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg">{action.label}</h3>
            </div>
            <p className="text-gray-600 ml-16">{action.description}</p>
          </Link>
        ))}
      </div>
    </BaseDashboard>
  );
}