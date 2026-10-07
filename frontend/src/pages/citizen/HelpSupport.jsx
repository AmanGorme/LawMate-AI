import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, LogOut, User, FileText, MessageSquare, Home, Shield, HelpCircle, Users, Phone, Mail, Globe, ExternalLink, Heart, AlertCircle } from 'lucide-react';

const HELPLINES = [
  { name: 'National Legal Aid Helpline', number: '15100', desc: 'Free legal aid for all citizens', icon: '⚖️', color: 'blue' },
  { name: 'Police Emergency', number: '100', desc: 'Emergency police assistance', icon: '🚔', color: 'red' },
  { name: 'Women Helpline', number: '181', desc: 'Support for women in distress', icon: '👩', color: 'pink' },
  { name: 'Child Helpline', number: '1098', desc: 'Help for children in need', icon: '👶', color: 'yellow' },
  { name: 'Senior Citizen Helpline', number: '14567', desc: 'Elder abuse and support', icon: '👴', color: 'teal' },
  { name: 'Consumer Helpline', number: '1915', desc: 'Consumer complaints', icon: '🛒', color: 'green' },
  { name: 'Anti-Corruption Helpline', number: '1064', desc: 'Report corruption', icon: '🚨', color: 'orange' },
  { name: 'Cyber Crime Helpline', number: '1930', desc: 'Online fraud and cybercrime', icon: '💻', color: 'purple' },
];

const FAQS = [
  { q: 'Is LawMate AI really free?', a: 'Yes! 100% free forever. No hidden charges, no credit card required. We believe legal knowledge should be accessible to everyone.' },
  { q: 'Is my data safe?', a: 'Absolutely. LawMate AI runs 100% offline on your device. Your documents and chats never leave your computer. We have zero access to your data.' },
  { q: 'Can I use this instead of a lawyer?', a: 'LawMate AI is a helpful guide, not a replacement for a licensed lawyer. Use it for awareness and understanding, but consult a real lawyer for serious legal matters.' },
  { q: 'What if I can\'t afford a lawyer?', a: 'You can call the National Legal Aid Helpline at 15100. The government provides free legal aid to those who cannot afford a lawyer. Visit your nearest District Legal Services Authority (DLSA).' },
  { q: 'How accurate are the answers?', a: 'Our AI is trained on Indian laws and updated regularly. However, laws change and every case is unique. Always verify with an official source or lawyer for critical decisions.' },
  { q: 'Can I upload any document?', a: 'Yes — rent agreements, court notices, bank letters, insurance policies, contracts, or any legal paper. Just make sure it\'s a PDF, TXT, or DOCX file.' },
];

export default function HelpSupport() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/citizen/login'); return; }
    if (role && role !== 'citizen') { navigate('/lawyer/dashboard'); return; }
    if (userData) setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/citizen/login');
  };

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
            <Link to="/citizen/documents" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><FileText className="w-5 h-5" /> Understand Document</Link>
            <Link to="/citizen/help" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><HelpCircle className="w-5 h-5" /> Help & Support</Link>
            <Link to="/citizen/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</Link>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* MAIN */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">❓ Help & Support</h1>
            <p className="text-gray-600">Important helplines and answers to common questions</p>
          </div>

          {/* EMERGENCY BANNER */}
          <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-2xl p-6 mb-8 text-white flex items-start gap-4">
            <AlertCircle className="w-8 h-8 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-1">In an Emergency?</h3>
              <p className="text-red-100 text-sm">
                If you are in immediate danger, call <strong className="text-white">100</strong> (Police) or <strong className="text-white">112</strong> (Emergency).
              </p>
            </div>
          </div>

          {/* HELPLINES */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-600" /> Important Helplines
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {HELPLINES.map((h, i) => (
                <a
                  key={i}
                  href={`tel:${h.number}`}
                  className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all border-l-4 border-green-500 group flex items-center gap-4"
                >
                  <div className="text-3xl">{h.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm">{h.name}</h3>
                    <p className="text-xs text-gray-500 mb-1">{h.desc}</p>
                    <p className="text-lg font-bold text-green-600">{h.number}</p>
                  </div>
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-green-600" /> Frequently Asked Questions
            </h2>
            <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
              {FAQS.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-800">{faq.q}</span>
                    <span className={`text-2xl text-green-600 transition-transform ${expandedFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {expandedFaq === i && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" /> Useful Government Links
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'National Legal Services Authority (NALSA)', url: 'https://nalsa.gov.in', desc: 'Free legal aid' },
                { name: 'Ministry of Law & Justice', url: 'https://lawmin.gov.in', desc: 'Official legal information' },
                { name: 'India Code', url: 'https://indiacode.nic.in', desc: 'All Indian laws' },
                { name: 'Consumer Helpline Portal', url: 'https://consumerhelpline.gov.in', desc: 'File consumer complaints' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition-all group flex items-center gap-4 border-l-4 border-blue-500"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm mb-1">{link.name}</h3>
                    <p className="text-xs text-gray-500">{link.desc}</p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* CONTACT CARD */}
          <div className="mt-8 bg-gradient-to-br from-emerald-600 to-green-800 rounded-2xl p-8 text-white text-center">
            <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Still Need Help?</h3>
            <p className="text-green-100 mb-6">Ask any legal question in the chat — it's free, private, and instant.</p>
            <Link
              to="/citizen/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Ask LawMate AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}