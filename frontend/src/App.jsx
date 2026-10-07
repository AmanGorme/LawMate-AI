import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public
import Home from './pages/Home';
import Portals from './pages/Portals';

// Lawyer Portal
import LawyerSignup from './pages/lawyer/LawyerSignup';
import LawyerLogin from './pages/lawyer/LawyerLogin';
import LawyerDashboard from './pages/lawyer/LawyerDashboard';
import LawyerChat from './pages/lawyer/LawyerChat';
import IPCBNSCompare from './pages/lawyer/IPCBNSCompare';
import DraftGenerator from './pages/lawyer/DraftGenerator';
import DocumentsManager from './pages/lawyer/DocumentsManager';
import LawyerProfile from './pages/lawyer/LawyerProfile';

// Citizen Portal
import CitizenSignup from './pages/citizen/CitizenSignup';
import CitizenLogin from './pages/citizen/CitizenLogin';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import CitizenChat from './pages/citizen/CitizenChat';
import KnowYourRights from './pages/citizen/KnowYourRights';
import UnderstandDocument from './pages/citizen/UnderstandDocument';
import HelpSupport from './pages/citizen/HelpSupport';
import CitizenProfile from './pages/citizen/CitizenProfile';

// Legacy
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portals" element={<Portals />} />

        {/* Lawyer Portal */}
        <Route path="/lawyer/signup" element={<LawyerSignup />} />
        <Route path="/lawyer/login" element={<LawyerLogin />} />
        <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
        <Route path="/lawyer/chat" element={<LawyerChat />} />
        <Route path="/lawyer/ipc-bns" element={<IPCBNSCompare />} />
        <Route path="/lawyer/drafts" element={<DraftGenerator />} />
        <Route path="/lawyer/documents" element={<DocumentsManager />} />
        <Route path="/lawyer/profile" element={<LawyerProfile />} />

        {/* Citizen Portal */}
        <Route path="/citizen/signup" element={<CitizenSignup />} />
        <Route path="/citizen/login" element={<CitizenLogin />} />
        <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
        <Route path="/citizen/chat" element={<CitizenChat />} />
        <Route path="/citizen/rights" element={<KnowYourRights />} />
        <Route path="/citizen/documents" element={<UnderstandDocument />} />
        <Route path="/citizen/help" element={<HelpSupport />} />
        <Route path="/citizen/profile" element={<CitizenProfile />} />

        {/* Legacy */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;