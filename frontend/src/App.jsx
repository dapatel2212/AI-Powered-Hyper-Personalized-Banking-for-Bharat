import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Common/Layout';
import ProtectedRoute from './components/Common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import LoanPage from './pages/LoanPage';
import WellnessPage from './pages/WellnessPage';
import ConsentPage from './pages/ConsentPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/chat" element={<ChatbotPage />} />
            <Route path="/loans" element={<LoanPage />} />
            <Route path="/wellness" element={<WellnessPage />} />
            <Route path="/consent" element={<ConsentPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
