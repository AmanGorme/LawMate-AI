import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Send, Upload, LogOut, User, FileText, MessageSquare, Search, Home, Paperclip, X } from 'lucide-react';
import { documentAPI } from '../services/api';
import axios from 'axios';

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! 👋 I'm LawMate AI. I can help you with legal questions, chat about general topics, or analyze your documents. How can I assist you today?", sender: 'bot' }
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
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      setUser(JSON.parse(userData));
    }

    checkStatus();
  }, [navigate]);

  const checkStatus = async () => {
    try {
      const response = await documentAPI.getStatus();
      setIsDocumentReady(response.data.ready);
    } catch (error) {
      console.error('Status check failed:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    setUploadedFileName(selectedFile.name);

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: `📄 Uploading document: ${selectedFile.name}`,
      sender: 'user'
    }]);

    try {
      const response = await documentAPI.upload(selectedFile);
      
      if (response.data.ready) {
        setIsDocumentReady(true);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: `✅ Document "${selectedFile.name}" uploaded successfully! (${response.data.chunks} chunks processed)\n\n💡 You can now ask questions about this document.`,
          sender: 'bot'
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `❌ Upload failed: ${error.response?.data?.detail || error.message}`,
        sender: 'bot'
      }]);
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeDocument = () => {
    setIsDocumentReady(false);
    setUploadedFileName(null);
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: `🗑️ Document removed. You can continue chatting or upload a new document.`,
      sender: 'bot'
    }]);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userMessage,
      sender: 'user'
    }]);

    setLoading(true);

    try {
      if (isDocumentReady) {
        try {
          const ragResponse = await documentAPI.ask(userMessage);
          let botResponse = ragResponse.data.answer;
          if (ragResponse.data.sources && ragResponse.data.sources.length > 0) {
            botResponse += '\n\n📚 **Sources:**\n' + ragResponse.data.sources.map((s, i) => `${i+1}. ${s}`).join('\n');
          }
          setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: botResponse,
            sender: 'bot'
          }]);
        } catch (error) {
          await handleGeneralChat(userMessage);
        }
      } else {
        await handleGeneralChat(userMessage);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `❌ Error: ${error.response?.data?.detail || error.message}`,
        sender: 'bot'
      }]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: This now calls the Python Llama 3.2 backend
  const handleGeneralChat = async (userMessage) => {
    try {
      // Create FormData to send to the backend
      const formData = new FormData();
      formData.append('message', userMessage);

      // Send the message to your Python /chat endpoint
      const response = await axios.post('http://localhost:8000/chat', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the bot's response from Llama 3.2
      const botResponse = response.data.response;

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot'
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: `❌ Sorry, I couldn't connect to the AI backend. Make sure the backend is running on port 8000.`,
        sender: 'bot'
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Home className="w-5 h-5" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg">
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

      {/* Chat Main */}
      <div className="ml-64 flex-1 flex flex-col h-screen">
        {/* Chat Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">💬 AI Chat</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-500">
                  {isDocumentReady ? (
                    <span className="text-green-600">✅ Document ready: {uploadedFileName}</span>
                  ) : (
                    <span className="text-blue-600">💡 Chat with AI or upload a document</span>
                  )}
                </p>
                {isDocumentReady && (
                  <button
                    onClick={removeDocument}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Remove
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                accept=".pdf,.txt,.docx"
              />
              <label 
                htmlFor="file-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                Upload
              </label>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl p-4 rounded-lg whitespace-pre-wrap ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white shadow border border-gray-100 text-gray-800'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white shadow p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white p-4">
          <div className="container mx-auto flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here... (legal, personal, or upload a document)"
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button 
              onClick={sendMessage}
              disabled={loading}
              className={`p-3 rounded-lg transition ${
                !loading
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">
            {isDocumentReady ? '📄 Document mode - ask about your document' : '💡 General chat mode - ask anything!'}
          </div>
        </div>
      </div>
    </div>
  );
}