import React from 'react';
import { Link } from 'react-router-dom';
import { Users, DollarSign, Trophy, TrendingUp } from 'lucide-react';
import BaseDashboard from '../BaseDashboard';
import { formatCurrency } from '../../../utils/format';

export default function AgentDashboard() {
  const stats = [
    { label: 'Clients actifs', value: '45', icon: Users },
    { label: 'Chiffre d\'affaires', value: formatCurrency(12500), icon: DollarSign },
    { label: 'Participations Lotto', value: '78', icon: Trophy },
    { label: 'Performance', value: '+15%', icon: TrendingUp }
  ];

  const quickActions = [
    { 
      label: 'Mes Clients',
      description: 'Gérer vos clients et leurs activités',
      path: '/dashboard/agent/clients',
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Participations Lotto',
      description: 'Voir les participations aux lottos',
      path: '/dashboard/agent/lotto-participants',
      icon: Trophy,
      color: 'green'
    },
    { 
      label: 'Rapports',
      description: 'Consulter les statistiques et rapports',
      path: '/dashboard/agent/reports',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <BaseDashboard title="Tableau de bord Agent">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.path}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 bg-${action.color}-100 rounded-lg`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <h3 className="font-medium text-lg">{action.label}</h3>
            </div>
            <p className="text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>
    </BaseDashboard>
  );
}