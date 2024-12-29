import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Settings, AlertTriangle, Trophy, Database, BarChart, DollarSign } from 'lucide-react';
import BaseDashboard from '../BaseDashboard';
import { formatCurrency } from '../../../utils/format';

export default function AdminDashboard() {
  const stats = [
    { 
      label: 'Utilisateurs actifs', 
      value: '1,234', 
      change: '+12.5%',
      icon: Users,
      color: 'blue'
    },
    { 
      label: 'Chiffre d\'affaires', 
      value: formatCurrency(234567), 
      change: '+8.2%',
      icon: DollarSign,
      color: 'green'
    },
    { 
      label: 'Participations Lotto', 
      value: '456', 
      change: '+15.3%',
      icon: Trophy,
      color: 'yellow'
    },
    { 
      label: 'Alertes système', 
      value: '3', 
      change: '-2',
      icon: AlertTriangle,
      color: 'red'
    }
  ];

  const quickActions = [
    {
      title: 'Gestion des Paris',
      items: [
        { 
          label: 'Paris Combinés',
          description: 'Configurer les règles des paris combinés',
          path: '/dashboard/admin/combined-bets',
          icon: BarChart,
          color: 'blue'
        },
        { 
          label: 'Lottos',
          description: 'Gérer les lottos et les tirages',
          path: '/dashboard/admin/lottos',
          icon: Trophy,
          color: 'yellow'
        }
      ]
    },
    {
      title: 'Administration',
      items: [
        { 
          label: 'Utilisateurs',
          description: 'Gérer les comptes et les rôles',
          path: '/dashboard/admin/users',
          icon: Users,
          color: 'green'
        },
        { 
          label: 'Permissions',
          description: 'Configurer les accès et droits',
          path: '/dashboard/admin/permissions',
          icon: Shield,
          color: 'purple'
        }
      ]
    },
    {
      title: 'Configuration',
      items: [
        { 
          label: 'Base de données',
          description: 'Explorer et gérer les données',
          path: '/dashboard/admin/database',
          icon: Database,
          color: 'indigo'
        },
        { 
          label: 'Paramètres',
          description: 'Configuration générale du site',
          path: '/dashboard/admin/site-config',
          icon: Settings,
          color: 'gray'
        }
      ]
    }
  ];

  const systemHealth = [
    { name: 'Base de données', status: 'healthy', uptime: '99.99%' },
    { name: 'Serveur API', status: 'healthy', uptime: '99.95%' },
    { name: 'Cache System', status: 'warning', uptime: '98.50%' },
  ];

  return (
    <BaseDashboard title="Tableau de bord Administrateur">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {quickActions.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            {section.items.map((action, actionIndex) => (
              <Link
                key={actionIndex}
                to={action.path}
                className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${action.color}-100 rounded-lg`}>
                    <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.label}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* État du système */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">État du Système</h2>
        <div className="space-y-4">
          {systemHealth.map((system, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${
                  system.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="font-medium">{system.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Uptime: {system.uptime}
                </span>
                <button className="text-blue-600 hover:text-blue-700">
                  Configurer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseDashboard>
  );
}