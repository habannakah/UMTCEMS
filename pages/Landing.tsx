import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShieldCheck, FileText } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-umt-navy rounded flex items-center justify-center text-white font-bold">U</div>
            <span className="text-xl font-bold text-umt-navy">UCEMS</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-slate-600 hover:text-umt-navy font-medium">Log In</Link>
            <Link to="/register" className="bg-umt-navy text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition font-medium">Register</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-umt-navy text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">University Club Event Management System</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Streamline your club's event proposals, approvals, and reporting in one centralized platform at UMT.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="bg-umt-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-amber-600 transition shadow-lg">Get Started</Link>
              <Link to="/login" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition border border-white/20">Sign In</Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-blue-100 text-umt-navy rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Digital Proposals</h3>
              <p className="text-slate-600">Submit and track event proposals online. Say goodbye to lost paperwork.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Efficient Approvals</h3>
              <p className="text-slate-600">Advisors and MPP can review, approve, or request amendments instantly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Event Tracking</h3>
              <p className="text-slate-600">Monitor event status, compliance, and post-event reporting seamlessly.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Universiti Malaysia Terengganu. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;