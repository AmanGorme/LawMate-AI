import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, BarChart3, BookOpen, Search, ArrowRight, Loader, Copy, Check } from 'lucide-react';
import axios from 'axios';

// Local IPC ↔ BNS mapping (common sections - expandable)
const IPC_BNS_MAP = {
  '302': { bns: '103', title: 'Murder', ipc: 'Punishment for murder', bns_text: 'Punishment for murder' },
  '304': { bns: '105', title: 'Culpable Homicide', ipc: 'Punishment for culpable homicide not amounting to murder', bns_text: 'Punishment for culpable homicide not amounting to murder' },
  '307': { bns: '109', title: 'Attempt to Murder', ipc: 'Attempt to murder', bns_text: 'Attempt to murder' },
  '323': { bns: '115', title: 'Voluntarily Causing Hurt', ipc: 'Punishment for voluntarily causing hurt', bns_text: 'Punishment for voluntarily causing hurt' },
  '325': { bns: '117', title: 'Grievous Hurt', ipc: 'Punishment for voluntarily causing grievous hurt', bns_text: 'Punishment for voluntarily causing grievous hurt' },
  '376': { bns: '64', title: 'Rape', ipc: 'Punishment for rape', bns_text: 'Punishment for rape' },
  '379': { bns: '303', title: 'Theft', ipc: 'Punishment for theft', bns_text: 'Punishment for theft' },
  '392': { bns: '309', title: 'Robbery', ipc: 'Punishment for robbery', bns_text: 'Punishment for robbery' },
  '420': { bns: '318', title: 'Cheating', ipc: 'Cheating and dishonestly inducing delivery of property', bns_text: 'Cheating' },
  '498A': { bns: '85', title: 'Cruelty by Husband', ipc: 'Husband or relative of husband of a woman subjecting her to cruelty', bns_text: 'Cruelty by husband or relatives' },
  '506': { bns: '351', title: 'Criminal Intimidation', ipc: 'Punishment for criminal intimidation', bns_text: 'Criminal intimidation' },
  '120B': { bns: '61', title: 'Criminal Conspiracy', ipc: 'Punishment of criminal conspiracy', bns_text: 'Criminal conspiracy' },
  '147': { bns: '191', title: 'Rioting', ipc: 'Punishment for rioting', bns_text: 'Rioting' },
  '341': { bns: '126', title: 'Wrongful Restraint', ipc: 'Punishment for wrongful restraint', bns_text: 'Wrongful restraint' },
  '406': { bns: '316', title: 'Criminal Breach of Trust', ipc: 'Punishment for criminal breach of trust', bns_text: 'Criminal breach of trust' },
  '304B': { bns: '80', title: 'Dowry Death', ipc: 'Dowry death', bns_text: 'Dowry death' },
  '354': { bns: '74', title: 'Assault on Woman', ipc: 'Assault or criminal force to woman with intent to outrage her modesty', bns_text: 'Assault on woman with intent to outrage modesty' },
  '509': { bns: '79', title: 'Word/Gesture Insulting Woman', ipc: 'Word, gesture or act intended to insult the modesty of a woman', bns_text: 'Word, gesture or act intended to insult modesty of a woman' },
};

export default function IPCBNSCompare() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/lawyer/login'); return; }
    if (role && role !== 'lawyer') { navigate('/citizen/dashboard'); return; }
    if (userData) setUser(JSON.parse(userData));
  }, [navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setResult(null);
    setAiExplanation('');

    // Clean the query - remove "ipc", "section", spaces
    const cleanQuery = searchQuery.toLowerCase()
      .replace(/ipc|section|sec|bns|indian penal code|bharatiya nyaya sanhita/g, '')
      .trim();

    // Check local map first
    const found = IPC_BNS_MAP[cleanQuery] || IPC_BNS_MAP[cleanQuery.toUpperCase()];

    if (found) {
      setResult({
        ipc: cleanQuery,
        bns: found.bns,
        title: found.title,
        ipc_text: found.ipc,
        bns_text: found.bns_text
      });
    }

    // Ask AI for detailed explanation
    try {
      const formData = new FormData();
      formData.append('message',
        `Explain IPC Section ${cleanQuery} and its corresponding BNS Section ${found?.bns || '(find equivalent)'}. Include: 1) What the section is about, 2) The exact old IPC text, 3) The new BNS section number and text, 4) Punishment details, 5) Key changes (if any) between IPC and BNS. Keep it concise and professional for a lawyer.`
      );

      const response = await axios.post('http://localhost:8000/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAiExplanation(response.data.response);
    } catch (error) {
      console.error('AI error:', error);
      setAiExplanation('⚠️ AI explanation unavailable. Please check the backend.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `IPC Section ${result.ipc} ↔ BNS Section ${result.bns}\n\nOld IPC: ${result.ipc_text}\nNew BNS: ${result.bns_text}\n\n${aiExplanation}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Link to="/lawyer/ipc-bns" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><BarChart3 className="w-5 h-5" /> IPC ↔ BNS</Link>
            <Link to="/lawyer/drafts" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BookOpen className="w-5 h-5" /> Draft Generator</Link>
            <Link to="/lawyer/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">⚖️ IPC ↔ BNS Comparison Tool</h1>
            <p className="text-gray-600">Instantly map old IPC sections to the new Bharatiya Nyaya Sanhita (BNS) code</p>
          </div>

          {/* SEARCH BAR */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-2 flex items-center gap-2">
              <div className="pl-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter IPC section (e.g., 302, 420, 498A, 376)"
                className="flex-1 py-3 outline-none text-lg"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                Compare
              </button>
            </div>
          </form>

          {/* QUICK EXAMPLES */}
          {!result && !loading && (
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Common Sections</h3>
              <div className="flex flex-wrap gap-2">
                {['302', '420', '498A', '376', '379', '304B', '307', '406'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSearchQuery(s); }}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                  >
                    IPC {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Analyzing section and generating comparison...</p>
            </div>
          )}

          {/* RESULT */}
          {result && !loading && (
            <div className="space-y-6">
              {/* COMPARISON CARD */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{result.title}</h2>
                      <p className="text-blue-100 mt-1">Section comparison</p>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition flex items-center gap-2 text-sm"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 divide-x divide-gray-100">
                  {/* IPC SIDE */}
                  <div className="p-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold mb-4">
                      📜 OLD IPC
                    </div>
                    <div className="text-3xl font-black text-gray-800 mb-2">IPC {result.ipc}</div>
                    <p className="text-gray-700 leading-relaxed">{result.ipc_text}</p>
                  </div>

                  {/* BNS SIDE */}
                  <div className="p-6 bg-green-50/30">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-4">
                      ✨ NEW BNS
                    </div>
                    <div className="text-3xl font-black text-gray-800 mb-2">BNS {result.bns}</div>
                    <p className="text-gray-700 leading-relaxed">{result.bns_text}</p>
                  </div>
                </div>
              </div>

              {/* AI EXPLANATION */}
              {aiExplanation && (
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Detailed Analysis</h3>
                  </div>
                  <div className="prose prose-blue max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {aiExplanation}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EMPTY STATE */}
          {!result && !loading && searchQuery === '' && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                <BarChart3 className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Compare</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Enter any IPC section number above to instantly see its BNS equivalent, with full AI-powered analysis
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}