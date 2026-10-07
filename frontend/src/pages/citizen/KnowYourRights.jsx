import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, Shield, HelpCircle, Users, ChevronRight, Search, X, CheckCircle, BookOpen, Sparkles, Loader } from 'lucide-react';
import axios from 'axios';

const RIGHTS_CATEGORIES = [
  { id: 'fundamental', label: 'Fundamental Rights', icon: '⚖️', color: 'blue', desc: '6 core rights guaranteed by the Constitution' },
  { id: 'arrest', label: 'Rights During Arrest', icon: '🚔', color: 'red', desc: 'What to do if police stop or arrest you' },
  { id: 'women', label: 'Women\'s Rights', icon: '👩', color: 'pink', desc: 'Legal protections for women in India' },
  { id: 'consumer', label: 'Consumer Rights', icon: '🛒', color: 'green', desc: 'Protection against faulty goods & services' },
  { id: 'worker', label: 'Worker & Employee Rights', icon: '💼', color: 'orange', desc: 'Salary, leave, PF, and workplace rights' },
  { id: 'tenant', label: 'Tenant Rights', icon: '🏠', color: 'purple', desc: 'Rights of renters and leaseholders' },
  { id: 'children', label: 'Children\'s Rights', icon: '👶', color: 'yellow', desc: 'Protection and education rights' },
  { id: 'senior', label: 'Senior Citizen Rights', icon: '👴', color: 'teal', desc: 'Welfare and protection for elders' },
];

const COMMON_QUESTIONS = {
  fundamental: [
    'What are the 6 fundamental rights in India?',
    'What is Article 21 (Right to Life)?',
    'Can my fundamental rights be taken away?',
  ],
  arrest: [
    'What are my rights if police arrest me?',
    'Do I have to answer police questions?',
    'How long can police keep me in custody?',
  ],
  women: [
    'What is the Domestic Violence Act?',
    'How do I file a complaint against workplace harassment?',
    'What is Section 498A?',
  ],
  consumer: [
    'How do I file a consumer complaint?',
    'What is the Consumer Protection Act 2019?',
    'Can I get a refund for a defective product?',
  ],
  worker: [
    'What is the minimum wage in India?',
    'What are my rights if my salary is not paid?',
    'How does PF (Provident Fund) work?',
  ],
  tenant: [
    'Can my landlord evict me without notice?',
    'Who pays for repairs in a rented house?',
    'Do I get my security deposit back?',
  ],
  children: [
    'What is the Right to Education Act?',
    'What is POCSO Act?',
    'At what age can a child work legally?',
  ],
  senior: [
    'What is the Maintenance and Welfare of Parents Act?',
    'What benefits do senior citizens get?',
    'How can elders complain about abuse?',
  ],
};

export default function KnowYourRights() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/citizen/login'); return; }
    if (role && role !== 'citizen') { navigate('/lawyer/dashboard'); return; }
    if (userData) setUser(JSON.parse(userData));
  }, [navigate]);

  const askAI = async (question) => {
    setSelectedQuestion(question);
    setAiAnswer('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('message',
        `Answer this legal question for an Indian citizen in SIMPLE, everyday language. Avoid legal jargon. Use bullet points. Include relevant IPC/BNS/Act sections if applicable.\n\nQuestion: ${question}`
      );

      const response = await axios.post('http://localhost:8000/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setAiAnswer(response.data.response);
    } catch (error) {
      setAiAnswer('⚠️ Could not load answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/citizen/login');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-green-50"><div className="text-xl text-green-600">Loading...</div></div>;

  const filteredCategories = RIGHTS_CATEGORIES.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Link to="/citizen/rights" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><Shield className="w-5 h-5" /> Know Your Rights</Link>
            <Link to="/citizen/documents" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><FileText className="w-5 h-5" /> Understand Document</Link>
            <Link to="/citizen/help" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><HelpCircle className="w-5 h-5" /> Help & Support</Link>
            <Link to="/citizen/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">🛡️ Know Your Rights</h1>
            <p className="text-gray-600">Learn about your legal rights in simple, easy-to-understand language</p>
          </div>

          {/* SEARCH */}
          <div className="bg-white rounded-xl shadow-sm p-2 flex items-center gap-2 mb-6">
            <Search className="w-5 h-5 text-gray-400 ml-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a topic (e.g., arrest, salary, tenant...)"
              className="flex-1 py-2 outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-500" /></button>
            )}
          </div>

          {/* CATEGORY GRID */}
          {!selectedCategory && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat); setAiAnswer(''); setSelectedQuestion(''); }}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all text-left group border-2 border-transparent hover:border-green-500"
                >
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2 text-lg">{cat.label}</h3>
                  <p className="text-sm text-gray-600 mb-4">{cat.desc}</p>
                  <span className="text-green-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ChevronRight className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* SELECTED CATEGORY */}
          {selectedCategory && (
            <div>
              <button
                onClick={() => { setSelectedCategory(null); setAiAnswer(''); setSelectedQuestion(''); }}
                className="mb-6 text-gray-600 hover:text-green-600 font-medium flex items-center gap-2"
              >
                ← Back to all categories
              </button>

              <div className="bg-gradient-to-br from-emerald-600 to-green-800 rounded-2xl p-8 mb-6 text-white">
                <div className="text-5xl mb-4">{selectedCategory.icon}</div>
                <h2 className="text-3xl font-bold mb-2">{selectedCategory.label}</h2>
                <p className="text-green-100">{selectedCategory.desc}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* QUESTIONS */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-green-600" />
                    Common Questions
                  </h3>
                  <div className="space-y-3">
                    {COMMON_QUESTIONS[selectedCategory.id]?.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => askAI(q)}
                        className={`w-full text-left p-4 rounded-xl transition-all border-2 ${
                          selectedQuestion === q
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-100 hover:border-green-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-gray-800 font-medium text-sm">{q}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI ANSWER */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    Answer
                  </h3>

                  {loading && (
                    <div className="text-center py-12">
                      <Loader className="w-10 h-10 text-green-600 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600 text-sm">AI is preparing your answer...</p>
                    </div>
                  )}

                  {!loading && !aiAnswer && (
                    <div className="text-center py-12">
                      <div className="inline-flex p-4 bg-green-100 rounded-2xl mb-4">
                        <HelpCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-gray-500 text-sm">Click a question to get an answer</p>
                    </div>
                  )}

                  {!loading && aiAnswer && (
                    <div>
                      <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-lg">
                        <p className="text-sm text-green-800 font-medium">Q: {selectedQuestion}</p>
                      </div>
                      <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {aiAnswer}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ask custom question */}
              {selectedCategory && (
                <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-bold text-gray-800 mb-3">💬 Have a different question?</h3>
                  <Link
                    to="/citizen/chat"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Ask in Chat
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}