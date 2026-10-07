import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Send, Upload, LogOut, User, FileText, MessageSquare, Home, Paperclip, X, BarChart3, BookOpen, Briefcase } from 'lucide-react';
import { documentAPI } from '../../services/api';
import axios from 'axios';

export default function LawyerChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello Advocate! 👋 I'm your LawMate AI legal assistant. Upload a case document or ask a legal question to get started.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isDocumentReady, setIsDocumentReady] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token) { navigate('/lawyer/login'); return; }
    if (role && role !== 'lawyer') { navigate('/citizen/chat'); return; }
    if (userData) setUser(JSON.parse(userData));
    checkStatus();
  }, [navigate]);

  const checkStatus = async () => {
    try {
      const response = await documentAPI.getStatus();
      setIsDocumentReady(response.data.ready);
    } catch (error) { console.error('Status check failed:', error); }
  };

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setLoading(true);
    setUploadedFileName(selectedFile.name);
    setMessages(prev => [...prev, { id: Date.now(), text: `📄 Uploading: ${selectedFile.name}`, sender: 'user' }]);
    try {
      const response = await documentAPI.upload(selectedFile);
      if (response.data.ready) {
        setIsDocumentReady(true);
        setMessages(prev => [...prev, { id: Date.now() + 1, text: `✅ Document "${selectedFile.name}" uploaded! (${response.data.chunks} chunks)\n\n💡 Ask me anything about this document.`, sender: 'bot' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: `❌ Upload failed: ${error.response?.data?.detail || error.message}`, sender: 'bot' }]);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeDocument = () => {
    setIsDocumentReady(false);
    setUploadedFileName(null);
    setMessages(prev => [...prev, { id: Date.now(), text: `🗑️ Document removed.`, sender: 'bot' }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), text: userMessage, sender: 'user' }]);
    setLoading(true);
    try {
      if (isDocumentReady) {
        try {
          const ragResponse = await documentAPI.ask(userMessage);
          let botResponse = ragResponse.data.answer;
          if (ragResponse.data.sources?.length > 0) {
            botResponse += '\n\n📚 **Sources:**\n' + ragResponse.data.sources.map((s, i) => `${i+1}. ${s}`).join('\n');
          }
          setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
        } catch { await handleGeneralChat(userMessage); }
      } else {
        await handleGeneralChat(userMessage);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: `❌ Error: ${error.response?.data?.detail || error.message}`, sender: 'bot' }]);
    } finally { setLoading(false); }
  };

  const handleGeneralChat = async (userMessage) => {
    try {
      const formData = new FormData();
      formData.append('message', userMessage);
      const response = await axios.post('http://localhost:8000/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.data.response, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: `❌ Could not connect to AI backend.`, sender: 'bot' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
            <div className="flex items-center gap-2 text-xs text-blue-200 mb-1">
              <Briefcase className="w-3 h-3" /> LAWYER PORTAL
            </div>
            <div className="font-semibold truncate">{user.full_name || user.username}</div>
          </div>
          <nav className="space-y-1">
            <Link to="/lawyer/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><Home className="w-5 h-5" /> Dashboard</Link>
            <Link to="/lawyer/chat" className="flex items-center gap-3 px-4 py-3 bg-white/20 rounded-lg"><MessageSquare className="w-5 h-5" /> AI Chat</Link>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><FileText className="w-5 h-5" /> Documents</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BarChart3 className="w-5 h-5" /> IPC ↔ BNS</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><BookOpen className="w-5 h-5" /> Draft Generator</a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition"><User className="w-5 h-5" /> Profile</a>
          </nav>
          <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </div>

      {/* CHAT MAIN */}
      <div className="ml-64 flex-1 flex flex-col h-screen">
        <div className="bg-white border-b px-6 py-4 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">💬 AI Legal Chat</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-500">
                  {isDocumentReady ? (<span className="text-green-600">✅ Case document ready: {uploadedFileName}</span>) : (<span className="text-blue-600">💡 Ask a legal question or upload a case document</span>)}
                </p>
                {isDocumentReady && (<button onClick={removeDocument} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"><X className="w-4 h-4" /> Remove</button>)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input ref={fileInputRef} type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept=".pdf,.txt,.docx" />
              <label htmlFor="file-upload" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"><Upload className="w-4 h-4" /> Upload Case</label>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl p-4 rounded-lg whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white shadow border border-gray-100 text-gray-800'}`}>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white shadow p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t bg-white p-4">
          <div className="container mx-auto flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full"><Paperclip className="w-5 h-5 text-gray-500" /></button>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask a legal question..." className="flex-1 p-3 border rounded-lg focus:outline-none focus:border-blue-500" />
            <button onClick={sendMessage} disabled={loading} className={`p-3 rounded-lg transition ${!loading ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}><Send className="w-5 h-5" /></button>
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">{isDocumentReady ? '📄 Document mode' : '💡 General legal chat'}</div>
        </div>
      </div>
    </div>
  );
}