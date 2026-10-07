import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, Shield, HelpCircle, Users, Upload, X, CheckCircle, Loader, Sparkles, Send } from 'lucide-react';
import { documentAPI } from '../../services/api';
import axios from 'axios';

export default function UnderstandDocument() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [documentReady, setDocumentReady] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [askingAI, setAskingAI] = useState(false);
  const [summary, setSummary] = useState('');
  const [summarizing, setSummarizing] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/citizen/login'); return; }
    if (role && role !== 'citizen') { navigate('/lawyer/dashboard'); return; }
    if (userData) setUser(JSON.parse(userData));

    const savedDoc = localStorage.getItem('citizenDocName');
    if (savedDoc) {
      setUploadedFileName(savedDoc);
      setDocumentReady(true);
    }
  }, [navigate]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setAnswer('');
    setSummary('');

    try {
      const response = await documentAPI.upload(file);
      if (response.data.ready) {
        setDocumentReady(true);
        setUploadedFileName(file.name);
        localStorage.setItem('citizenDocName', file.name);

        // Auto-generate summary using CITIZEN endpoint
        await generateSummary(file.name);
      }
    } catch (error) {
      alert('Upload failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ⭐ UPDATED: Uses /chat/citizen for friendly, simple summaries
  const generateSummary = async (fileName) => {
    setSummarizing(true);
    try {
      const formData = new FormData();
      formData.append('message',
        `Summarize the uploaded document "${fileName}" in SIMPLE, everyday language that a common citizen can understand. Include:\n\n1. What this document is (type)\n2. Key points in bullet form (max 8 bullets)\n3. What the reader should do next\n4. Any important dates, amounts, or names\n\nAvoid legal jargon. Use simple words.`
      );

      const response = await axios.post('http://localhost:8000/chat/citizen', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSummary(response.data.response);
    } catch (error) {
      console.error('Summary error:', error);
      setSummary('⚠️ Could not generate summary. Please try again.');
    } finally {
      setSummarizing(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setAskingAI(true);
    setAnswer('');

    try {
      const ragResponse = await documentAPI.ask(question);
      let responseText = ragResponse.data.answer;
      if (ragResponse.data.sources?.length > 0) {
        responseText += '\n\n📚 Based on your document.';
      }
      setAnswer(responseText);
    } catch (error) {
      setAnswer('⚠️ Could not get an answer. Please try again.');
    } finally {
      setAskingAI(false);
    }
  };

  const removeDocument = () => {
    setDocumentReady(false);
    setUploadedFileName(null);
    setAnswer('');
    setSummary('');
    localStorage.removeItem('citizenDocName');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('citizenDocName');
    navigate('/citizen/login');
  };

  const commonQuestions = [
    'What does this document mean in simple words?',
    'Do I need to sign this?',
    'What happens if I ignore this document?',
    'Is there a deadline mentioned?',
    'What should I do next?',
  ];

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-green-50"><div className="text-xl text-green-600">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-emerald-700 to-green-900 shadow-lg fixed h-full text-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white/10 p-2 rounded-xl"><Scale className="w-6 h-6" /></div>
            <span className="text-lg font-bold">LawMate AI</span>
          </div>
          <div className="mb-6 p-3 bg-white/10 rounded-xl">
            <div className="flex items-center gap-2 text-xs text-green-200 mb-1">
              <Users className="w-3 h-3" /> CITIZEN PORTAL
            </div>
            <div className="font-semibold truncate">{user.full_name || user.username}</div>
          </div>
          <nav className="space-y-1">
            <Link to="/citizen/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><Home className="w-5 h-5" /> Dashboard</Link>
            <Link to="/citizen/chat" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><MessageSquare className="w-5 h-5" /> Ask a Question</Link>
            <Link to="/citizen/rights" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><Shield className="w-5 h-5" /> Know Your Rights</Link>
            <Link to="/citizen/documents" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><FileText className="w-5 h-5" /> Understand Document</Link>
            <Link to="/citizen/help" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><HelpCircle className="w-5 h-5" /> Help & Support</Link>
            <Link to="/citizen/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📄 Understand Your Document</h1>
            <p className="text-gray-600">Upload any legal document and I'll explain it in simple words</p>
          </div>

          {!documentReady ? (
            /* UPLOAD AREA */
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="inline-flex p-5 bg-green-100 rounded-2xl mb-6">
                <Upload className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload a Legal Document</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Rent agreement, court notice, bank letter, insurance policy, or any legal paper — upload it and I'll explain what it means.
              </p>

              <input ref={fileInputRef} type="file" id="doc-upload-citizen" className="hidden" onChange={handleUpload} accept=".pdf,.txt,.docx" />
              <label
                htmlFor="doc-upload-citizen"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all cursor-pointer"
              >
                {uploading ? (
                  <><Loader className="w-5 h-5 animate-spin" /> Uploading...</>
                ) : (
                  <><Upload className="w-5 h-5" /> Choose Document</>
                )}
              </label>

              <p className="text-xs text-gray-400 mt-6">Supported: PDF, TXT, DOCX · Max 10 MB</p>
            </div>
          ) : (
            /* DOCUMENT LOADED */
            <div className="space-y-6">
              {/* FILE BANNER */}
              <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{uploadedFileName}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" /> Document loaded and ready
                    </p>
                  </div>
                </div>
                <button onClick={removeDocument} className="p-2 hover:bg-red-50 rounded-lg transition" title="Remove">
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>

              {/* SUMMARY */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">Summary in Simple Words</h3>
                </div>

                {summarizing ? (
                  <div className="text-center py-8">
                    <Loader className="w-10 h-10 text-purple-600 animate-spin mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">Reading and simplifying your document...</p>
                    <p className="text-gray-400 text-xs mt-1">This may take 10-20 seconds</p>
                  </div>
                ) : summary ? (
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {summary}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Summary will appear here.</p>
                )}
              </div>

              {/* ASK QUESTIONS */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">💬 Ask About This Document</h3>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-3">💡 Common questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {commonQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => setQuestion(q)}
                        className="px-3 py-1.5 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-medium hover:bg-green-100 transition"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
                    placeholder="Ask anything about this document..."
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                  />
                  <button
                    onClick={handleAsk}
                    disabled={askingAI || !question.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {askingAI ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>

                {answer && (
                  <div className="mt-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                    <p className="text-sm text-green-800 font-medium mb-2">Q: {question}</p>
                    <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">{answer}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}