import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Scale, LogOut, User, FileText, MessageSquare, Search, Home,
  Briefcase, TrendingUp, BookOpen, Sparkles, Upload, ArrowRight,
  Clock, CheckCircle, ChevronRight, BarChart3, FolderOpen
} from 'lucide-react';

export default function LawyerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/lawyer/login'); return; }
    if (role && role !== 'lawyer') { navigate('/citizen/dashboard'); return; }
    if (userData) { setUser(JSON.parse(userData)); }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/lawyer/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="text-xl text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 shadow-lg fixed h-full text-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white/10 p-2 rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold">LawMate AI</span>
          </div>

          <div className="mb-6 p-3 bg-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-blue-200 mb-1">
              <Briefcase className="w-3 h-3" />
              LAWYER PORTAL
            </div>
            <div className="font-semibold truncate">{user.full_name || user.username}</div>
          </div>

          <nav className="space-y-1">
            <Link to="/lawyer/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg">
              <Home className="w-5 h-5" />
              Dashboard
            </Link>
            <Link to="/lawyer/chat" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <MessageSquare className="w-5 h-5" />
              AI Chat
            </Link>
            <Link to="/lawyer/documents" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <FileText className="w-5 h-5" />
              Documents
            </Link>
            <Link to="/lawyer/ipc-bns" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <BarChart3 className="w-5 h-5" />
              IPC ↔ BNS
            </Link>
            <Link to="/lawyer/drafts" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
              <BookOpen className="w-5 h-5" />
              Draft Generator
            </Link>
            <Link to="/lawyer/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition">
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
              Welcome back, {user.full_name || user.username}! 👨‍⚖️
            </h1>
            <p className="text-gray-500 mt-1">Your professional legal AI workspace is ready</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg font-medium">
              ⚖️ {user.email}
            </span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Documents</p>
              <FolderOpen className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Ready to upload</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Research Queries</p>
              <Search className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Start researching</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Drafts Generated</p>
              <FileText className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Create your first</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 font-medium">Time Saved</p>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0h</p>
            <p className="text-xs text-gray-400 mt-1">Estimated this week</p>
          </div>
        </div>

        {/* PROFESSIONAL TOOLS */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold mb-4">
              <Sparkles className="w-3 h-3" />
              PROFESSIONAL TOOLS
            </div>
            <h2 className="text-2xl font-bold mb-2">Your Legal AI Assistant is Ready</h2>
            <p className="text-blue-100 mb-6 max-w-2xl">
              Upload case documents, research IPC↔BNS mappings, or generate legal drafts — all powered by AI, all on your device.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/lawyer/chat" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                <MessageSquare className="w-5 h-5" />
                Start AI Chat
              </Link>
              <Link to="/lawyer/documents" className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-semibold hover:bg-white/30 transition-all">
                <Upload className="w-5 h-5" />
                Upload Document
              </Link>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS - NOW CLICKABLE */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/lawyer/ipc-bns" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">IPC ↔ BNS Compare</h3>
            <p className="text-sm text-gray-600 mb-4">Instantly map old IPC sections to the new BNS code</p>
            <span className="text-blue-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Open Tool <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link to="/lawyer/drafts" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Generate Legal Draft</h3>
            <p className="text-sm text-gray-600 mb-4">Create notices, agreements, and petitions automatically</p>
            <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Start Drafting <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <Link to="/lawyer/documents" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer group">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <Search className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Case Research</h3>
            <p className="text-sm text-gray-600 mb-4">Search across your uploaded case files instantly</p>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Search Now <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">📋 Recent Client Files</h2>
            <Link to="/lawyer/documents" className="text-sm text-blue-600 font-medium hover:underline">View All</Link>
          </div>
          <p className="text-gray-500 text-sm">
            No recent files. Upload a document to get started with case analysis.
          </p>
        </div>
      </div>
    </div>
  );
}