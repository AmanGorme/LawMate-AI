import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Scale, LogOut, User, FileText, MessageSquare, Home, Users,
  HelpCircle, Shield, BookOpen, Upload, ArrowRight, Heart,
  Lightbulb, Phone, Globe, ChevronRight, CheckCircle
} from 'lucide-react';

export default function CitizenDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/citizen/login');
      return;
    }

    if (role && role !== 'citizen') {
      navigate('/lawyer/dashboard');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/citizen/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-xl text-green-600">Loading...</div>
      </div>
    );
  }

  const commonQuestions = [
    { icon: Shield, text: 'What are my fundamental rights?', color: 'blue' },
    { icon: Phone, text: 'What to do if police arrest me?', color: 'red' },
    { icon: FileText, text: 'How to file an FIR?', color: 'purple' },
    { icon: Users, text: 'Rights of a woman at workplace', color: 'pink' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-emerald-700 to-green-900 shadow-lg fixed h-full text-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white/10 p-2 rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold">LawMate AI</span>
          </div>

          <div className="mb-6 p-3 bg-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-green-200 mb-1">
              <Users className="w-3 h-3" />
              CITIZEN PORTAL
            </div>
            <div className="font-semibold truncate">{user.full_name || user.username}</div>
          </div>

          <nav className="space-y-1">
            <Link to="/citizen/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg">
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link to="/citizen/chat" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <MessageSquare className="w-5 h-5" />
              Ask a Question
            </Link>
            <Link to="/citizen/rights" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <Shield className="w-5 h-5" />
              Know Your Rights
            </Link>
            <Link to="/citizen/documents" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <FileText className="w-5 h-5" />
              Understand Document
            </Link>
            <Link to="/citizen/help" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <HelpCircle className="w-5 h-5" />
              Help & Support
            </Link>
            <Link to="/citizen/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <User className="w-5 h-5" />
              Profile
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, {user.full_name || user.username}! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Your free legal AI assistant — here to help you understand your rights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-green-600 bg-green-50 px-4 py-2 rounded-lg font-medium">
              👤 {user.email}
            </span>
          </div>
        </div>

        {/* WELCOME BANNER */}
        <div className="bg-gradient-to-br from-emerald-600 to-green-800 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
              <Heart className="w-3 h-3" />
              FREE FOREVER
            </div>
            <h2 className="text-2xl font-bold mb-2">Law Made Simple For You</h2>
            <p className="text-green-100 mb-6 max-w-2xl">
              Ask any legal question in plain language. Upload documents you don't understand.
              Get clear, friendly answers — no legal jargon, no fees, no judgments.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/citizen/chat" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all">
                <MessageSquare className="w-5 h-5" />
                Ask a Question
              </Link>
              <Link to="/citizen/documents" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-all">
                <Upload className="w-5 h-5" />
                Upload Document
              </Link>
            </div>
          </div>
        </div>

        {/* COMMON QUESTIONS */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-800">Common Legal Questions</h2>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Click any question to get an instant, easy-to-understand answer
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {commonQuestions.map((q, i) => (
              <Link
                key={i}
                to="/citizen/rights"
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer group flex items-center gap-4"
              >
                <div className={`p-3 rounded-xl bg-${q.color}-100`}>
                  <q.icon className={`w-6 h-6 text-${q.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {q.text}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>

        {/* FEATURES FOR CITIZENS - NOW CLICKABLE */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/citizen/rights" className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500 hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Know Your Rights</h3>
            <p className="text-sm text-gray-600">
              Learn about your fundamental rights in simple words
            </p>
          </Link>

          <Link to="/citizen/documents" className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500 hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Read Documents</h3>
            <p className="text-sm text-gray-600">
              Upload any legal document and get a plain explanation
            </p>
          </Link>

          <Link to="/citizen/help" className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-500 hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Help & Helplines</h3>
            <p className="text-sm text-gray-600">
              Important helplines and answers to common questions
            </p>
          </Link>
        </div>

        {/* TIPS SECTION */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            💡 Tips for Citizens
          </h2>
          <div className="space-y-3">
            {[
              'Always keep a copy of any legal document you receive',
              'You have the right to remain silent during police questioning',
              'Free legal aid is available for those who cannot afford a lawyer',
              'You can file an FIR at any police station, even outside your area'
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}