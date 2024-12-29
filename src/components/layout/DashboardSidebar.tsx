import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Dices, 
  Wallet, 
  History, 
  Users, 
  Gift, 
  Lock, 
  UserCircle, 
  LogOut,
  ChevronDown,
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Mail
} from 'lucide-react';
import Logo from './Logo';
import ContactModal from '../contact/ContactModal';

const getMenuItems = (role: string) => {
  const baseItems = [
    { icon: Mail, label: 'Contact', action: () => setIsContactModalOpen(true) }
  ];

  const betsSubmenu = [
    { icon: Clock, label: 'Paris en cours', path: '/dashboard/bets/active' },
    { icon: CheckCircle, label: 'Paris gagnés', path: '/dashboard/bets/won' },
    { icon: XCircle, label: 'Paris perdus', path: '/dashboard/bets/lost' },
    { icon: History, label: 'Historique', path: '/dashboard/bets/history' }
  ];

  switch (role) {
    case 'externaluser':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/external' },
        { 
          icon: Trophy, 
          label: 'Paris Sport',
          submenu: betsSubmenu
        },
        { icon: Wallet, label: 'Dépôt', path: '/deposit' },
        { icon: History, label: 'Transactions', path: '/transactions' },
        { icon: Users, label: 'Parrainage', path: '/referral' },
        { icon: Gift, label: 'Bonus', path: '/bonus' },
        { icon: Lock, label: 'Sécurité', path: '/security' },
        { icon: UserCircle, label: 'Profile', path: '/profile' },
        ...baseItems
      ];

    case 'agentuser':
      return [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard/agent' },
        { 
          icon: Trophy, 
          label: 'Paris Sport',
          submenu: betsSubmenu
        },
        { icon: Users, label: 'Mes Clients', path: '/dashboard/agent/clients' },
        { icon: History, label: 'Transactions', path: '/dashboard/agent/transactions' },
        ...baseItems
      ];

    // ... autres cas de rôles ...
    default:
      return [];
  }
};

export default function DashboardSidebar() {
  const { logout, userData } = useAuth();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const menuItems = getMenuItems(userData?.role || '');

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0">
      <div className="p-4 border-b">
        <Logo />
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubMenu(item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      openSubMenu === item.label ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {openSubMenu === item.label && (
                    <div className="ml-4 pl-4 border-l border-gray-200 space-y-1 mt-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                              isActive
                                ? 'bg-blue-50 text-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`
                          }
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span className="font-medium text-sm">{subItem.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : item.action ? (
                <button
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              )}
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}