import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, BarChart3, BookOpen, Upload, Trash2, Search, X, CheckCircle, AlertCircle } from 'lucide-react';
import { documentAPI } from '../../services/api';

export default function DocumentsManager() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/lawyer/login'); return; }
    if (role && role !== 'lawyer') { navigate('/citizen/dashboard'); return; }
    if (userData) setUser(JSON.parse(userData));

    // Load saved docs from localStorage (you can later store in DB)
    const savedDocs = JSON.parse(localStorage.getItem('lawyerDocs') || '[]');
    setDocuments(savedDocs);
  }, [navigate]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess('');

    try {
      await documentAPI.upload(file);

      const newDoc = {
        id: Date.now(),
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        type: file.type,
        uploadedAt: new Date().toISOString()
      };

      const updatedDocs = [newDoc, ...documents];
      setDocuments(updatedDocs);
      localStorage.setItem('lawyerDocs', JSON.stringify(updatedDocs));
      setUploadSuccess(`"${file.name}" uploaded successfully!`);
      setTimeout(() => setUploadSuccess(''), 3000);
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    const updated = documents.filter(d => d.id !== id);
    setDocuments(updated);
    localStorage.setItem('lawyerDocs', JSON.stringify(updated));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/lawyer/login');
  };

  const filteredDocs = documents.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Link to="/lawyer/documents" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><FileText className="w-5 h-5" /> Documents</Link>
            <Link to="/lawyer/ipc-bns" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BarChart3 className="w-5 h-5" /> IPC ↔ BNS</Link>
            <Link to="/lawyer/drafts" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BookOpen className="w-5 h-5" /> Draft Generator</Link>
            <Link to="/lawyer/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">📁 Case Documents</h1>
              <p className="text-gray-600">Manage your case files and legal documents</p>
            </div>
            <div>
              <input ref={fileInputRef} type="file" id="doc-upload" className="hidden" onChange={handleUpload} accept=".pdf,.txt,.docx" />
              <label htmlFor="doc-upload" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all cursor-pointer">
                <Upload className="w-5 h-5" />
                {uploading ? 'Uploading...' : 'Upload Document'}
              </label>
            </div>
          </div>

          {uploadSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
              <CheckCircle className="w-5 h-5" />
              {uploadSuccess}
            </div>
          )}

          {/* SEARCH */}
          <div className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-2 mb-6">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className="flex-1 py-2 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-500" /></button>
            )}
          </div>

          {/* DOCUMENTS GRID */}
          {filteredDocs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {searchQuery ? 'No documents match your search' : 'No documents yet'}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {searchQuery ? 'Try a different search term' : 'Upload your first case document to get started'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 truncate" title={doc.name}>{doc.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{doc.size}</span>
                    <span>·</span>
                    <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}