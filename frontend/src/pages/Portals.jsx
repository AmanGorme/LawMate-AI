import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Briefcase, Users, ArrowLeft, CheckCircle, ArrowRight, Star, Sparkles } from 'lucide-react';

const Portals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-2xl">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">LawMate AI</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Choose Your Journey
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
            Which Portal Are You?
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select your role to get a tailored experience built just for you.
          </p>
        </div>

        {/* Two Portals */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

          {/* ============ LAWYER CARD ============ */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-2">
            {/* Top colored bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>

            <div className="p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-full text-xs font-bold text-blue-700 mb-6">
                <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
                PROFESSIONAL PORTAL
              </div>

              {/* Icon */}
              <div className="inline-flex p-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-500">
                <Briefcase className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                I'm a Lawyer
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Get advanced legal research tools, document analysis,
                IPC↔BNS mapping, and client case management — all with
                complete privacy.
              </p>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {[
                  'Advanced legal research',
                  'IPC ↔ BNS comparison',
                  'Draft generation',
                  'Client case management',
                  'Bulk document analysis'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  to="/lawyer/signup"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/40 transition-all"
                >
                  Sign Up as Lawyer
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/lawyer/login"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

          {/* ============ CITIZEN CARD ============ */}
          <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 overflow-hidden hover:-translate-y-2">
            {/* Top colored bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-700"></div>

            <div className="p-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 rounded-full text-xs font-bold text-green-700 mb-6">
                <CheckCircle className="w-3.5 h-3.5" />
                FREE FOR EVERYONE
              </div>

              {/* Icon */}
              <div className="inline-flex p-5 bg-gradient-to-br from-emerald-600 to-green-800 rounded-2xl mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform duration-500">
                <Users className="w-12 h-12 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                I'm a Citizen
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Understand your legal rights in simple language, ask
                questions freely, and get guidance — completely free,
                always available.
              </p>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {[
                  'Know your fundamental rights',
                  'Simple legal explanations',
                  'Ask anything, anytime',
                  'Upload & understand documents',
                  'Available 24/7, always free'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  to="/citizen/signup"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/40 transition-all"
                >
                  Sign Up as Citizen
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/citizen/login"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-green-200 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-all"
                >
                  Already have an account? Login
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom note */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>Not sure which portal? You can always switch later.</p>
        </div>

      </div>
    </div>
  );
};

export default Portals;