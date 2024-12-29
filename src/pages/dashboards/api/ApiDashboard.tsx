import React from 'react';
import { Database, BarChart, Settings } from 'lucide-react';
import BaseDashboard from '../BaseDashboard';
import ApiStatus from '../../../components/api/ApiStatus';
import FeatureCard from '../../../components/api/FeatureCard';
import UsageStats from '../../../components/api/UsageStats';
import { useFirestoreConnection } from '../../../hooks/useFirestoreConnection';
import { oddsApi } from '../../../services/odds';

const features = [
  {
    title: 'Configuration API',
    description: 'Gérer la clé API et les paramètres de connexion',
    icon: Settings,
    path: '/dashboard/api/odds-config',
    color: 'blue'
  },
  {
    title: 'Sports',
    description: 'Configurer les championnats et leurs paramètres',
    icon: BarChart,
    path: '/dashboard/api/sports-config',
    color: 'green'
  },
  {
    title: 'Base de données',
    description: 'Explorer et gérer les données',
    icon: Database,
    path: '/dashboard/api/database',
    color: 'purple'
  }
];

export default function ApiDashboard() {
  const isConfigured = oddsApi.isConfigured();
  const { isOnline } = useFirestoreConnection();

  return (
    <BaseDashboard title="Configuration API">
      <div className="space-y-6">
        <ApiStatus isConfigured={isConfigured} isOnline={isOnline} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <UsageStats />
      </div>
    </BaseDashboard>
  );
}