import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Search, Home } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Scale className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">LawMate AI</span>
          </div>
          
          <nav className="space-y-2">
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
              <Home className="w-5 h-5" />
              Dashboard
            </a>
            <a href="/chat" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MessageSquare className="w-5 h-5" />
              Chat
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5" />
              Documents
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Search className="w-5 h-5" />
              Legal Search
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <User className="w-5 h-5" />
              Profile
            </a>
          </nav>
          
          <button
            onClick={handleLogout}
            className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {user.full_name || user.username}!
            </h1>
            <p className="text-gray-500 mt-1">Here's what's happening with your legal research</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
              {user.email}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Documents</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Upload your first document</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Questions</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Ask a legal question</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Drafts</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Generate a draft</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
            <p className="text-sm text-gray-500">Saved</p>
            <p className="text-2xl font-bold text-gray-800">0</p>
            <p className="text-xs text-gray-400 mt-1">Bookmark content</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🚀 Get Started with LawMate AI
          </h2>
          <p className="text-gray-600 mb-6">
            Upload your first document or ask a legal question to get started.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm hover:shadow">
              📄 Upload Document
            </button>
            <a href="/chat">
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                💬 Ask Question
              </button>
            </a>
            <button className="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
              ⚖️ Compare IPC vs BNS
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📋 Recent Activity
          </h2>
          <p className="text-gray-500 text-sm">
            No recent activity yet. Start by uploading a document or asking a question!
          </p>
        </div>
      </div>
    </div>
  );
}