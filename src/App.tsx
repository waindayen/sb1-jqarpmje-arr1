import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BetSlipProvider } from './contexts/BetSlipContext';
import { ConnectionProvider } from './contexts/ConnectionContext';
import PrivateRoute from './components/PrivateRoute';
import RoleRoute from './components/RoleRoute';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';
import MobileBetSlip from './pages/MobileBetSlip';
import Lotto from './pages/Lotto';
import LottoResults from './pages/LottoResults';
import Contact from './pages/Contact';

// Admin Pages
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import CombinedBetsConfig from './pages/dashboards/admin/CombinedBetsConfig';
import LottoManagement from './pages/dashboards/admin/LottoManagement';
import SetupLotto from './pages/dashboards/admin/SetupLotto';
import LottoDraws from './pages/dashboards/admin/LottoDraws';

// Staff Pages
import StaffDashboard from './pages/dashboards/staff/StaffDashboard';
import StaffLottoParticipants from './pages/dashboards/staff/LottoParticipants';
import StaffTickets from './pages/dashboards/staff/Tickets';
import StaffClients from './pages/dashboards/staff/Clients';

// External Pages
import ExternalDashboard from './pages/dashboards/external/ExternalDashboard';
import ExternalLottoParticipants from './pages/dashboards/external/LottoParticipants';

// Agent Pages
import AgentDashboard from './pages/dashboards/agent/AgentDashboard';
import AgentLottoParticipants from './pages/dashboards/agent/LottoParticipants';

// Betting Pages
import ActiveBets from './pages/dashboards/bets/ActiveBets';
import WonBets from './pages/dashboards/bets/WonBets';
import LostBets from './pages/dashboards/bets/LostBets';
import BetsHistory from './pages/dashboards/bets/BetsHistory';

export default function App() {
  return (
    <AuthProvider>
      <ConnectionProvider>
        <BetSlipProvider>
          <Router>
            <Routes>
              {/* Routes publiques avec AuthLayout */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>

              {/* Routes protégées avec DashboardLayout */}
              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                  {/* Routes Admin */}
                  <Route path="admin" element={
                    <RoleRoute allowedRoles={['adminuser']}>
                      <AdminDashboard />
                    </RoleRoute>
                  } />
                  <Route path="admin/combined-bets" element={
                    <RoleRoute allowedRoles={['adminuser']}>
                      <CombinedBetsConfig />
                    </RoleRoute>
                  } />
                  <Route path="admin/lottos" element={
                    <RoleRoute allowedRoles={['adminuser']}>
                      <LottoManagement />
                    </RoleRoute>
                  } />
                  <Route path="admin/setup-lotto" element={
                    <RoleRoute allowedRoles={['adminuser']}>
                      <SetupLotto />
                    </RoleRoute>
                  } />
                  <Route path="admin/setup-lotto/:id" element={
                    <RoleRoute allowedRoles={['adminuser']}>
                      <SetupLotto />
                    </RoleRoute>
                  } />
                  <Route path="admin/lotto-draws" element={
                    <RoleRoute allowedRoles={['adminuser']}>
                      <LottoDraws />
                    </RoleRoute>
                  } />

                  {/* Routes Staff */}
                  <Route path="staff" element={
                    <RoleRoute allowedRoles={['staffuser']}>
                      <StaffDashboard />
                    </RoleRoute>
                  } />
                  <Route path="staff/lotto-participants" element={
                    <RoleRoute allowedRoles={['staffuser']}>
                      <StaffLottoParticipants />
                    </RoleRoute>
                  } />
                  <Route path="staff/tickets" element={
                    <RoleRoute allowedRoles={['staffuser']}>
                      <StaffTickets />
                    </RoleRoute>
                  } />
                  <Route path="staff/clients" element={
                    <RoleRoute allowedRoles={['staffuser']}>
                      <StaffClients />
                    </RoleRoute>
                  } />

                  {/* Routes External */}
                  <Route path="external" element={
                    <RoleRoute allowedRoles={['externaluser']}>
                      <ExternalDashboard />
                    </RoleRoute>
                  } />
                  <Route path="external/lotto-participants" element={
                    <RoleRoute allowedRoles={['externaluser']}>
                      <ExternalLottoParticipants />
                    </RoleRoute>
                  } />

                  {/* Routes Agent */}
                  <Route path="agent" element={
                    <RoleRoute allowedRoles={['agentuser']}>
                      <AgentDashboard />
                    </RoleRoute>
                  } />
                  <Route path="agent/lotto-participants" element={
                    <RoleRoute allowedRoles={['agentuser']}>
                      <AgentLottoParticipants />
                    </RoleRoute>
                  } />

                  {/* Routes des paris */}
                  <Route path="bets/active" element={
                    <RoleRoute allowedRoles={['externaluser', 'agentuser']}>
                      <ActiveBets />
                    </RoleRoute>
                  } />
                  <Route path="bets/won" element={
                    <RoleRoute allowedRoles={['externaluser', 'agentuser']}>
                      <WonBets />
                    </RoleRoute>
                  } />
                  <Route path="bets/lost" element={
                    <RoleRoute allowedRoles={['externaluser', 'agentuser']}>
                      <LostBets />
                    </RoleRoute>
                  } />
                  <Route path="bets/history" element={
                    <RoleRoute allowedRoles={['externaluser', 'agentuser']}>
                      <BetsHistory />
                    </RoleRoute>
                  } />
                </Route>
              </Route>

              {/* Routes publiques avec MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/lotto" element={<Lotto />} />
                <Route path="/lotto/results" element={<LottoResults />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/betslip" element={<MobileBetSlip />} />
              </Route>
            </Routes>
          </Router>
        </BetSlipProvider>
      </ConnectionProvider>
    </AuthProvider>
  );
}