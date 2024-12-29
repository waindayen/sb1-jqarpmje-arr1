import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import BetSlip from '../betslip/BetSlip';
import MobileNavigation from './MobileNavigation';
import { useAuth } from '../../contexts/AuthContext';

export default function MainLayout() {
  const [isBetSlipOpen, setIsBetSlipOpen] = React.useState(true);
  const { userData } = useAuth();
  const isApiUser = userData?.role === 'apiuser';
  const showBetSlip = !isApiUser && window.location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {!isApiUser && (
        <Header onToggleBetSlip={() => setIsBetSlipOpen(!isBetSlipOpen)} showBetSlip={showBetSlip} />
      )}
      <div className={`pt-16 pb-16 md:pb-0 ${showBetSlip ? 'md:pr-80' : ''}`}>
        <Outlet />
      </div>
      {showBetSlip && (
        <div className="hidden md:block">
          <BetSlip isOpen={isBetSlipOpen} onClose={() => setIsBetSlipOpen(!isBetSlipOpen)} />
        </div>
      )}
      {!isApiUser && <MobileNavigation />}
    </div>
  );
}