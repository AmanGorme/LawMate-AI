// import { 
//   Scale, 
//   BookOpen, 
//   Users, 
//   Shield, 
//   ArrowRight, 
//   Zap, 
//   FileText, 
//   MessageSquare, 
//   Search, 
//   Upload,
//   Star,
//   Menu
// } from 'lucide-react';

// export default function Landing() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
//       {/* Navbar */}
//       <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <div className="bg-blue-600 p-2 rounded-lg">
//             <Scale className="w-6 h-6 text-white" />
//           </div>
//           <span className="text-2xl font-bold text-gray-800">LawMate <span className="text-blue-600">AI</span></span>
//         </div>
//         <div className="hidden md:flex items-center gap-8">
//           <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
//           <a href="#about" className="text-gray-600 hover:text-gray-800">About</a>
//           <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a>
//         </div>
//         <div className="flex items-center gap-3">
//           {/* GitHub link without icon */}
//           <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
//              className="text-gray-600 hover:text-gray-800 text-sm font-medium">
//             GitHub
//           </a>
//           <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium">
//             Login
//           </button>
//           <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="container mx-auto px-6 py-16 md:py-24">
//         <div className="text-center max-w-4xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
//             <Zap className="w-4 h-4" />
//             AI-Powered Legal Assistant
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 leading-tight">
//             Your AI-Powered
//             <span className="text-blue-600 block mt-2"> Legal Assistant</span>
//           </h1>
          
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
//             Empowering lawyers, students, and citizens with intelligent legal research,
//             document analysis, and AI-powered assistance.
//           </p>
          
//           <div className="flex flex-wrap gap-4 justify-center">
//             <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl">
//               Start Chatting
//               <ArrowRight className="w-5 h-5" />
//             </button>
//             <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
//               Learn More
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
//             <div>
//               <p className="text-3xl font-bold text-blue-600">10K+</p>
//               <p className="text-gray-600">Users</p>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-blue-600">50K+</p>
//               <p className="text-gray-600">Questions</p>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-blue-600">98%</p>
//               <p className="text-gray-600">Satisfaction</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section id="features" className="container mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//             Why <span className="text-blue-600">LawMate AI</span>?
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Everything you need for intelligent legal research and document analysis
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-1">
//               <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-3 text-gray-800">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//               <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 font-medium">
//                 Learn more <ArrowRight className="w-4 h-4" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="container mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//             How It <span className="text-blue-600">Works</span>
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Three simple steps to get started with LawMate AI
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {steps.map((step, index) => (
//             <div key={index} className="text-center">
//               <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
//                 {index + 1}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
//               <p className="text-gray-600">{step.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="bg-blue-600 py-20">
//         <div className="container mx-auto px-6">
//           <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
//             What People Are Saying
//           </h2>
//           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {testimonials.map((testimonial, index) => (
//               <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg">
//                     {testimonial.name[0]}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">{testimonial.name}</p>
//                     <p className="text-sm text-gray-500">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-600">"{testimonial.text}"</p>
//                 <div className="flex mt-3 text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-5 h-5 fill-current" />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="container mx-auto px-6 py-20 text-center">
//         <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 max-w-4xl mx-auto">
//           <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//             Ready to Get Started?
//           </h2>
//           <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
//             Join thousands of legal professionals using LawMate AI
//           </p>
//           <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium shadow-lg hover:shadow-xl">
//             Start Free Trial
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="border-t border-gray-200 py-12">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center gap-2 mb-4 md:mb-0">
//               <Scale className="w-6 h-6 text-blue-600" />
//               <span className="text-xl font-bold text-gray-800">LawMate AI</span>
//             </div>
//             <div className="flex gap-8 text-gray-600">
//               <a href="#" className="hover:text-blue-600">Privacy</a>
//               <a href="#" className="hover:text-blue-600">Terms</a>
//               <a href="#" className="hover:text-blue-600">Support</a>
//             </div>
//             <p className="text-gray-500 text-sm mt-4 md:mt-0">
//               Built with ❤️ for the legal community
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// // Data Arrays
// const features = [
//   {
//     icon: <Search className="w-7 h-7 text-blue-600" />,
//     title: "Legal Research",
//     description: "Search and analyze laws, cases, and legal documents instantly with AI-powered insights."
//   },
//   {
//     icon: <FileText className="w-7 h-7 text-blue-600" />,
//     title: "Document Analysis",
//     description: "Upload and analyze legal documents with automatic summaries, key sections, and recommendations."
//   },
//   {
//     icon: <MessageSquare className="w-7 h-7 text-blue-600" />,
//     title: "AI Chat Assistant",
//     description: "Get instant answers to legal questions with context-aware responses and source citations."
//   },
//   {
//     icon: <Upload className="w-7 h-7 text-blue-600" />,
//     title: "Document Upload",
//     description: "Upload PDFs, Word documents, and images with automatic OCR and text extraction."
//   },
//   {
//     icon: <Scale className="w-7 h-7 text-blue-600" />,
//     title: "IPC vs BNS",
//     description: "Compare Indian Penal Code sections with Bharatiya Nyaya Sanhita for legal research."
//   },
//   {
//     icon: <BookOpen className="w-7 h-7 text-blue-600" />,
//     title: "Draft Generator",
//     description: "Generate legal documents, notices, complaints, and agreements with AI assistance."
//   }
// ];

// const steps = [
//   {
//     title: "Upload Documents",
//     description: "Upload your legal documents, case files, or research materials"
//   },
//   {
//     title: "AI Analysis",
//     description: "Our AI analyzes and processes your documents for insights"
//   },
//   {
//     title: "Get Results",
//     description: "Receive summaries, recommendations, and answers instantly"
//   }
// ];

// const testimonials = [
//   {
//     name: "Adv. Priya Sharma",
//     role: "Supreme Court Lawyer",
//     text: "LawMate AI has transformed how I research cases. It's like having a team of research assistants."
//   },
//   {
//     name: "Rahul Verma",
//     role: "Law Student",
//     text: "This tool helped me understand complex legal concepts and prepare for exams more effectively."
//   },
//   {
//     name: "Dr. Ananya Patel",
//     role: "Legal Scholar",
//     text: "The document analysis feature saves me hours of reading time. Highly recommended!"
//   }
// ];

import { Link } from 'react-router-dom';
import { 
  Scale, 
  BookOpen, 
  Users, 
  Shield, 
  ArrowRight, 
  Zap, 
  FileText, 
  MessageSquare, 
  Search, 
  Upload,
  Star,
  Menu
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-800">LawMate <span className="text-blue-600">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
          <a href="#about" className="text-gray-600 hover:text-gray-800">About</a>
          <a href="#contact" className="text-gray-600 hover:text-gray-800">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
             className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            GitHub
          </a>
          <Link to="/login">
            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            AI-Powered Legal Assistant
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 leading-tight">
            Your AI-Powered
            <span className="text-blue-600 block mt-2"> Legal Assistant</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Empowering lawyers, students, and citizens with intelligent legal research,
            document analysis, and AI-powered assistance.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/login">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl cursor-pointer">
                Start Chatting
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium cursor-pointer">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div>
              <p className="text-3xl font-bold text-blue-600">10K+</p>
              <p className="text-gray-600">Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">50K+</p>
              <p className="text-gray-600">Questions</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-blue-600">98%</p>
              <p className="text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why <span className="text-blue-600">LawMate AI</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need for intelligent legal research and document analysis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 font-medium">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Three simple steps to get started with LawMate AI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-600 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            What People Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">"{testimonial.text}"</p>
                <div className="flex mt-3 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of legal professionals using LawMate AI
          </p>
          <Link to="/signup">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-medium shadow-lg hover:shadow-xl cursor-pointer">
              Start Free Trial
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Scale className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">LawMate AI</span>
            </div>
            <div className="flex gap-8 text-gray-600">
              <a href="#" className="hover:text-blue-600">Privacy</a>
              <a href="#" className="hover:text-blue-600">Terms</a>
              <a href="#" className="hover:text-blue-600">Support</a>
            </div>
            <p className="text-gray-500 text-sm mt-4 md:mt-0">
              Built with ❤️ for the legal community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data Arrays
const features = [
  {
    icon: <Search className="w-7 h-7 text-blue-600" />,
    title: "Legal Research",
    description: "Search and analyze laws, cases, and legal documents instantly with AI-powered insights."
  },
  {
    icon: <FileText className="w-7 h-7 text-blue-600" />,
    title: "Document Analysis",
    description: "Upload and analyze legal documents with automatic summaries, key sections, and recommendations."
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-blue-600" />,
    title: "AI Chat Assistant",
    description: "Get instant answers to legal questions with context-aware responses and source citations."
  },
  {
    icon: <Upload className="w-7 h-7 text-blue-600" />,
    title: "Document Upload",
    description: "Upload PDFs, Word documents, and images with automatic OCR and text extraction."
  },
  {
    icon: <Scale className="w-7 h-7 text-blue-600" />,
    title: "IPC vs BNS",
    description: "Compare Indian Penal Code sections with Bharatiya Nyaya Sanhita for legal research."
  },
  {
    icon: <BookOpen className="w-7 h-7 text-blue-600" />,
    title: "Draft Generator",
    description: "Generate legal documents, notices, complaints, and agreements with AI assistance."
  }
];

const steps = [
  {
    title: "Upload Documents",
    description: "Upload your legal documents, case files, or research materials"
  },
  {
    title: "AI Analysis",
    description: "Our AI analyzes and processes your documents for insights"
  },
  {
    title: "Get Results",
    description: "Receive summaries, recommendations, and answers instantly"
  }
];

const testimonials = [
  {
    name: "Adv. Priya Sharma",
    role: "Supreme Court Lawyer",
    text: "LawMate AI has transformed how I research cases. It's like having a team of research assistants."
  },
  {
    name: "Rahul Verma",
    role: "Law Student",
    text: "This tool helped me understand complex legal concepts and prepare for exams more effectively."
  },
  {
    name: "Dr. Ananya Patel",
    role: "Legal Scholar",
    text: "The document analysis feature saves me hours of reading time. Highly recommended!"
  }
];