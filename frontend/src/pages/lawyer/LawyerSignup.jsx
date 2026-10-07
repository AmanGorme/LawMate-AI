import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Briefcase, ArrowLeft, Mail, Lock, User, UserCircle, ArrowRight, CheckCircle } from 'lucide-react';
import axios from 'axios';

const LawyerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/auth/signup', {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: 'lawyer'
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', 'lawyer');

      navigate('/lawyer/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-xl">
              <Scale className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">LawMate AI</span>
          </Link>
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            FOR LEGAL PROFESSIONALS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Supercharge<br />Your Legal Practice
          </h1>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Join hundreds of advocates and law firms using LawMate AI to research faster, draft smarter, and serve clients better.
          </p>
          <ul className="space-y-4">
            {[
              'Instant IPC ↔ BNS section mapping',
              'Analyze contracts & case files in seconds',
              'Generate legal drafts automatically',
              'Complete client confidentiality (100% offline)',
              'Free forever — no credit card required'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="p-1 bg-white/20 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-blue-50">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative text-blue-200 text-sm">
          © 2026 LawMate AI · Built for a better India
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link to="/portals" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Portals
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Lawyer Account</h2>
            <p className="text-gray-600">Get access to professional legal AI tools</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="Adv. John Doe" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="username" required value={formData.username} onChange={handleChange} placeholder="johndoe_lawyer" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@lawfirm.com" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Creating Account...' : (<>Create Lawyer Account <ArrowRight className="w-5 h-5" /></>)}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have a lawyer account?{' '}
            <Link to="/lawyer/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </p>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            Not a lawyer?{' '}
            <Link to="/citizen/signup" className="text-green-600 font-semibold hover:underline">Sign up as Citizen instead</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerSignup;