import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Scale, Briefcase, Users, Shield, FileText, Search, Sparkles,
  ArrowRight, CheckCircle, Zap, Lock, Brain, BookOpen, Star,
  TrendingUp, Globe, MessageSquare, ChevronRight
} from 'lucide-react';

const Home = () => {
  const [hoveredPortal, setHoveredPortal] = useState(null);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl">
                  <Scale className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                LawMate <span className="text-blue-600">AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
            </div>

            <Link
              to="/portals"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full mb-8 shadow-sm">
            <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
            <span className="text-sm font-medium text-blue-700">
              Powered by Llama 3.2 · 100% Offline · Completely Private
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-[1.05]">
            Justice Made
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Accessible to All
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            India's first AI legal assistant that runs entirely on your device.
            No cloud. No data leaks. Just intelligent legal help for lawyers and citizens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/portals"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              Explore Portals
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              Learn More
            </a>
          </div>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>Instant Responses</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <span>Multi-Language</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-white">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black mb-2">100%</div>
            <div className="text-blue-100 text-sm md:text-base">Offline & Private</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black mb-2">10x</div>
            <div className="text-blue-100 text-sm md:text-base">Faster Research</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black mb-2">24/7</div>
            <div className="text-blue-100 text-sm md:text-base">Always Available</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black mb-2">₹0</div>
            <div className="text-blue-100 text-sm md:text-base">Completely Free</div>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SECTION ========== */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">About the Project</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What is LawMate AI?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                LawMate AI is a revolutionary legal assistant that uses advanced AI
                (<span className="font-semibold text-blue-600">Llama 3.2</span>) to make Indian law
                accessible to everyone — from practicing advocates to ordinary citizens.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Unlike other AI tools, LawMate AI runs <span className="font-semibold text-gray-900">entirely on your device</span>.
                This means your sensitive legal documents, client information, and
                conversations <span className="font-semibold text-green-600">never leave your computer</span>.
              </p>
              <div className="space-y-3">
                {[
                  'Analyze legal documents in seconds',
                  'Compare IPC sections with the new BNS code',
                  'Get simple explanations for complex laws',
                  'Generate legal drafts automatically'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Powered By</div>
                    <div className="font-bold text-lg">Llama 3.2</div>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">AI Model</span>
                    <span className="font-semibold">Llama 3.2 : 3B</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">Privacy</span>
                    <span className="font-semibold text-green-400">100% Offline</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <span className="text-gray-400">RAG Engine</span>
                    <span className="font-semibold">FAISS + LangChain</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-400">Cost</span>
                    <span className="font-semibold text-green-400">Free Forever</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full mb-4">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge AI technology to serve lawyers and citizens alike
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, color: 'blue', title: 'Bank-Level Privacy', desc: 'Runs completely offline. Your legal documents never touch any cloud server.' },
              { icon: FileText, color: 'purple', title: 'Document Analysis', desc: 'Upload PDFs and get AI-powered summaries, insights, and answers instantly.' },
              { icon: Search, color: 'green', title: 'IPC ↔ BNS Compare', desc: 'Instantly map old IPC sections to the new BNS code introduced in 2023.' },
              { icon: MessageSquare, color: 'orange', title: 'Natural Chat', desc: 'Talk to your legal AI just like ChatGPT — ask anything, anytime.' },
              { icon: TrendingUp, color: 'pink', title: 'Smart Drafting', desc: 'Generate legal notices, agreements, and petitions with AI assistance.' },
              { icon: Globe, color: 'indigo', title: 'Multi-Language', desc: 'Support for English, Hindi, and Marathi — law in your language.' },
            ].map((f, i) => (
              <div
                key={i}
                className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl bg-${f.color}-100 mb-5 group-hover:scale-110 transition-transform`}>
                  <f.icon className={`w-6 h-6 text-${f.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS SECTION (REPLACED PORTALS) ========== */}
      <section id="how-it-works" className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl opacity-50"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Legal Help in
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 3 Simple Steps</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No complicated setup. No credit card. Just intelligent legal assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>

            {[
              {
                step: '01',
                icon: Users,
                color: 'blue',
                title: 'Create Your Account',
                desc: 'Sign up as a Lawyer for advanced tools, or as a Citizen for simple legal guidance. Takes 30 seconds.'
              },
              {
                step: '02',
                icon: MessageSquare,
                color: 'purple',
                title: 'Ask or Upload',
                desc: 'Chat naturally with the AI, or upload a PDF/Image for deep analysis. Everything runs on your device.'
              },
              {
                step: '03',
                icon: Zap,
                color: 'green',
                title: 'Get Instant Answers',
                desc: 'Receive AI-powered responses in seconds — with sources, explanations, and next steps.'
              }
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white font-black text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  {item.step}
                </div>

                <div className={`inline-flex p-4 rounded-2xl bg-${item.color}-100 mb-6 ml-4`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/portals"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== WHO IT'S FOR SECTION ========== */}
      <section id="who-its-for" className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-4 shadow-sm">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Built For Everyone</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Who is LawMate AI For?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're a legal professional or an everyday citizen, LawMate AI adapts to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            {/* LAWYERS INFO CARD (no signup button) */}
            <div className="relative group bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl p-10 text-white overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-6">
                  <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                  PROFESSIONALS
                </div>

                <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Briefcase className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-bold mb-4">For Legal Professionals</h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Advocates, law firms, and legal researchers who need advanced AI-powered tools to work smarter.
                </p>

                <ul className="space-y-3">
                  {[
                    'Research IPC & BNS sections instantly',
                    'Analyze large contracts & case files',
                    'Generate legal drafts in minutes',
                    'Compare old and new criminal codes',
                    'Maintain complete client confidentiality'
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
            </div>

            {/* CITIZENS INFO CARD (no signup button) */}
            <div className="relative group bg-gradient-to-br from-emerald-600 via-green-700 to-green-900 rounded-3xl p-10 text-white overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-6">
                  <CheckCircle className="w-3.5 h-3.5" />
                  EVERY CITIZEN
                </div>

                <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-bold mb-4">For Everyday Citizens</h3>
                <p className="text-green-100 mb-6 text-lg">
                  Anyone in India who wants to understand their legal rights without paying expensive consultation fees.
                </p>

                <ul className="space-y-3">
                  {[
                    'Know your fundamental rights',
                    'Understand laws in simple language',
                    'Get guidance at any hour, for free',
                    'Upload documents to understand them',
                    'Know the next steps to take'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="p-1 bg-white/20 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <span className="text-green-50">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              to="/portals"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
            >
              Choose Your Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section id="testimonials" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-full mb-4">
              <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
              <span className="text-sm font-semibold text-yellow-700 uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Professionals & Citizens
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Adv. Rajesh Sharma',
                role: 'Criminal Lawyer, Delhi',
                quote: 'The IPC to BNS comparison feature saves me hours every day. It\'s like having a junior associate who never sleeps.',
                initials: 'RS',
                color: 'blue'
              },
              {
                name: 'Priya Deshmukh',
                role: 'Law Student, Mumbai',
                quote: 'I use LawMate AI for all my research. The fact that it works offline means I can study anywhere, and my notes stay private.',
                initials: 'PD',
                color: 'purple'
              },
              {
                name: 'Amit Kumar',
                role: 'Citizen, Bangalore',
                quote: 'I got clarity on a property dispute without paying ₹5,000 for a single consultation. This is truly justice for all.',
                initials: 'AK',
                color: 'green'
              }
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${t.color}-500 to-${t.color}-700 flex items-center justify-center text-white font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex p-4 bg-blue-100 rounded-2xl mb-6">
            <Scale className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Experience Smarter Law?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Join us in making legal knowledge accessible to every Indian.
          </p>
          <Link
            to="/portals"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
          >
            Choose Your Portal
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-xl">
                  <Scale className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">LawMate AI</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Making Indian law accessible to everyone through AI — with complete privacy,
                zero cost, and no compromise on quality.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-white">About</a></li>
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            © 2026 LawMate AI · Built with ❤️ for a better India
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;