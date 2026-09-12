import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Loan from './pages/Loan';
import Wellness from './pages/Wellness';
import Literacy from './pages/Literacy';
import Consent from './pages/Consent';
import WhatsApp from './pages/WhatsApp';

import ChatWindow from './components/Chatbot/ChatWindow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/literacy" element={<Literacy />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/whatsapp" element={<WhatsApp />} />
      </Routes>
      <ChatWindow />
    </BrowserRouter>
  );
}

export default App;
