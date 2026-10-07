import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, BarChart3, BookOpen, Sparkles, Loader, Copy, Check, Download, Wand2 } from 'lucide-react';
import axios from 'axios';
import { DRAFT_TEMPLATES } from './DraftTemplates';

const DRAFT_TYPES = [
  { id: 'legal-notice', label: 'Legal Notice', icon: '📩', desc: 'Formal notice before legal action' },
  { id: 'rent-agreement', label: 'Rent Agreement', icon: '🏠', desc: 'Residential/commercial rental agreement' },
  { id: 'affidavit', label: 'Affidavit', icon: '📜', desc: 'Sworn statement for court' },
  { id: 'power-of-attorney', label: 'Power of Attorney', icon: '⚖️', desc: 'Authorize someone to act on your behalf' },
  { id: 'noc', label: 'No Objection Certificate', icon: '✅', desc: 'NOC for various purposes' },
  { id: 'cheque-bounce', label: 'Cheque Bounce Notice', icon: '💳', desc: 'Notice under Section 138 NI Act' },
  { id: 'consumer-complaint', label: 'Consumer Complaint', icon: '🛒', desc: 'Complaint against defective product/service' },
  { id: 'divorce-petition', label: 'Divorce Petition', icon: '💔', desc: 'Mutual consent divorce petition' },
];

export default function DraftGenerator() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [details, setDetails] = useState('');
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useAI, setUseAI] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/lawyer/login'); return; }
    if (role && role !== 'lawyer') { navigate('/citizen/dashboard'); return; }
    if (userData) setUser(JSON.parse(userData));
  }, [navigate]);

  // Fill template with user details directly (no AI needed)
  const fillTemplate = (template, detailsText) => {
    let filled = template;

    // Extract key-value pairs from details text
    const lines = detailsText.split('\n');
    const data = {};

    lines.forEach(line => {
      const match = line.match(/^([^:]+):\s*(.+)$/);
      if (match) {
        const key = match[1].trim().toUpperCase().replace(/\s+/g, '_');
        const value = match[2].trim();
        data[key] = value;
      }
    });

    // Replace placeholders
    Object.keys(data).forEach(key => {
      const placeholder = `[${key}]`;
      filled = filled.replaceAll(placeholder, data[key]);
    });

    // Replace remaining placeholders with ____
    filled = filled.replace(/\[[A-Z_0-9]+\]/g, '________________');

    return filled;
  };

  // Use AI to intelligently fill template
  const fillTemplateWithAI = async (template, draftLabel, detailsText) => {
    const prompt = `You are a template filler assistant. Below is a legal document TEMPLATE with [PLACEHOLDERS]. Below that is the CLIENT'S DATA.

Your ONLY job is to replace the [PLACEHOLDERS] in the template with the corresponding values from the client's data. Output the ENTIRE filled template exactly as-is, just with placeholders replaced.

DO NOT add warnings. DO NOT refuse. DO NOT lecture. Just fill in the template.

If a value is missing, replace the placeholder with "________".

=== TEMPLATE ===
${template}

=== CLIENT DATA ===
${detailsText}

=== OUTPUT (filled template) ===`;

    const formData = new FormData();
    formData.append('message', prompt);

    const response = await axios.post('http://localhost:8000/chat', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data.response;
  };

  const handleGenerate = async () => {
    if (!selectedType || !details.trim()) return;

    setLoading(true);
    setGeneratedDraft('');

    try {
      const template = DRAFT_TEMPLATES[selectedType];
      if (!template) {
        setGeneratedDraft('⚠️ Template not found.');
        return;
      }

      if (useAI) {
        // Use AI to fill template (intelligent matching)
        const filled = await fillTemplateWithAI(template.template, template.title, details);
        setGeneratedDraft(filled);
      } else {
        // Direct replacement (instant, no AI)
        const filled = fillTemplate(template.template, details);
        setGeneratedDraft(filled);
      }
    } catch (error) {
      console.error('Draft generation error:', error);
      // Fallback: use direct replacement
      const template = DRAFT_TEMPLATES[selectedType];
      setGeneratedDraft(fillTemplate(template.template, details));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDraft], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedType}-draft.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            <Link to="/lawyer/drafts" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><BookOpen className="w-5 h-5" /> Draft Generator</Link>
            <Link to="/lawyer/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">📝 AI Draft Generator</h1>
            <p className="text-gray-600">Generate professional legal drafts in seconds</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">1. Choose Draft Type</h2>
                <div className="grid grid-cols-2 gap-3">
                  {DRAFT_TYPES.map((draft) => (
                    <button
                      key={draft.id}
                      onClick={() => setSelectedType(draft.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        selectedType === draft.id
                          ? 'border-blue-600 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-1">{draft.icon}</div>
                      <div className="font-semibold text-gray-800 text-sm">{draft.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">2. Provide Details</h2>
                <p className="text-xs text-gray-500 mb-3">
                  💡 Use format "Key: Value" for best results. Example: <br />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">Name: John Doe</code> <br />
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs">Address: Mumbai</code>
                </p>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Name: Rajesh Kumar&#10;Address: 22 MG Road, Delhi&#10;Amount: 500000&#10;Due Date: 15 March 2026&#10;..."
                  className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none text-sm font-mono"
                />

                {/* AI toggle */}
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="text-xs text-gray-600">
                    Use AI for smarter matching (slower)
                  </span>
                </label>

                <button
                  onClick={handleGenerate}
                  disabled={!selectedType || !details.trim() || loading}
                  className="w-full mt-4 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader className="w-5 h-5 animate-spin" /> Generating...</>
                  ) : (
                    <><Wand2 className="w-5 h-5" /> Generate Draft</>
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT: PREVIEW */}
            <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">📄 Preview</h2>
                {generatedDraft && (
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Copy">
                      {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                    </button>
                    <button onClick={handleDownload} className="p-2 hover:bg-gray-100 rounded-lg transition" title="Download">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex-1 bg-gray-50 rounded-xl p-6 overflow-y-auto max-h-[600px]">
                {loading ? (
                  <div className="text-center py-12">
                    <Loader className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-sm">Generating your draft...</p>
                  </div>
                ) : generatedDraft ? (
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 leading-relaxed">{generatedDraft}</pre>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-4">
                      <FileText className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-gray-500 text-sm">Your draft will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}