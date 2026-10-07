import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, BarChart3, BookOpen, Mail, Briefcase, Calendar, Save, CheckCircle } from 'lucide-react';

export default function LawyerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', username: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/lawyer/login'); return; }
    if (role && role !== 'lawyer') { navigate('/citizen/dashboard'); return; }
    if (userData) {
      const u = JSON.parse(userData);
      setUser(u);
      setFormData({ full_name: u.full_name || '', username: u.username || '' });
    }
  }, [navigate]);

  const handleSave = () => {
    const updated = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/lawyer/login');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-blue-50"><div className="text-xl text-blue-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 shadow-lg fixed h-full text-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white/10 p-2 rounded-xl"><Scale className="w-6 h-6" /></div>
            <span className="text-lg font-bold">LawMate AI</span>
          </div>
          <div className="mb-6 p-3 bg-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-blue-200 mb-1">👨‍⚖️ LAWYER PORTAL</div>
            <div className="font-semibold truncate">{user.full_name || user.username}</div>
          </div>
          <nav className="space-y-1">
            <Link to="/lawyer/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><Home className="w-5 h-5" /> Dashboard</Link>
            <Link to="/lawyer/chat" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><MessageSquare className="w-5 h-5" /> AI Chat</Link>
            <Link to="/lawyer/documents" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><FileText className="w-5 h-5" /> Documents</Link>
            <Link to="/lawyer/ipc-bns" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BarChart3 className="w-5 h-5" /> IPC ↔ BNS</Link>
            <Link to="/lawyer/drafts" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BookOpen className="w-5 h-5" /> Draft Generator</Link>
            <Link to="/lawyer/profile" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">👤 My Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>

          {saved && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              Profile updated successfully!
            </div>
          )}

          {/* PROFILE HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl font-bold">
                {(user.full_name || user.username || 'U')[0].toUpperCase()}
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-2">
                  <Briefcase className="w-3 h-3" /> LAWYER
                </div>
                <h2 className="text-3xl font-bold">{user.full_name || user.username}</h2>
                <p className="text-blue-100 mt-1 flex items-center gap-2"><Mail className="w-4 h-4" /> {user.email}</p>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Account Information</h3>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="px-4 py-2 text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setEditing(false)} className="px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800 text-lg">{user.full_name || 'Not set'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">Username</label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800 text-lg">{user.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">Email</label>
                <p className="text-gray-800 text-lg">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-2">Role</label>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  <Briefcase className="w-4 h-4" /> Lawyer
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}