import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MissionSchedule from './pages/MissionSchedule';
import Troop from './pages/Troop';
import Logs from './pages/Logs';
import RegisterPage from './pages/RegisterPage';
import UserDirectory from './pages/UserDirectory';
import Rankings from './pages/Rankings';
import Armory from './pages/Armory';
import Briefing from './pages/Briefing';
import CurrentStatus from './pages/CurrentStatus';

import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#353d1a',
            color: '#f4f6e8',
            border: '1px solid #7a912a',
            fontFamily: 'monospace',
          },
        }}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="players" element={<Troop />} />
            <Route path="schedule" element={<MissionSchedule />} />
            <Route path="history" element={<Logs />} />
            <Route path="rankings" element={<Rankings />} />
            <Route path="directory" element={<UserDirectory />} />
            <Route path="armory" element={<Armory />} />
            <Route path="briefing" element={<Briefing />} />
            <Route path="current-status" element={<CurrentStatus />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
