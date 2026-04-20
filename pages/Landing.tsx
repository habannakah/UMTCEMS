import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShieldCheck, FileText } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-umt-navy rounded-lg shadow-sm flex items-center justify-center text-white font-bold">U</div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">UMTCEMS</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-umt-navy transition-colors px-3 py-2 rounded-lg hover:bg-slate-50">Log In</Link>
            <Link to="/register" className="text-sm font-medium bg-umt-navy text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors shadow-sm shadow-umt-navy/20">Register</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-umt-navy to-blue-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 mb-8">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-umt-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-umt-accent"></span>
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-blue-100">Live for UMT Clubs</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">Streamlined Event Management</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed opacity-90">
              Your club's proposals, approvals, and post-event reporting handled in one centralized, intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-umt-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-amber-500 transition-all shadow-lg shadow-umt-accent/30 hover:shadow-xl hover:-translate-y-0.5">Get Started</Link>
              <Link to="/login" className="bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20 hover:border-white/30">Sign In</Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Everything you need</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Replace endless email chains and physical paperwork with a unified digital workflow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-100 transition-transform">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Digital Proposals</h3>
              <p className="text-slate-500 leading-relaxed">Submit and track event proposals online. Say goodbye to lost paperwork and manual signatures.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md hover:border-emerald-200 transition-all group relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-100 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Efficient Approvals</h3>
              <p className="text-slate-500 leading-relaxed">Advisors and MPP can review, approve, or request amendments instantly with complete audit trails.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center hover:shadow-md hover:border-amber-200 transition-all group">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-amber-100 transition-transform">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Event Lifecycle</h3>
              <p className="text-slate-500 leading-relaxed">Monitor event status from draft to completion, including automated post-event report tracking.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-umt-navy rounded flex items-center justify-center text-white font-bold text-xs">U</div>
            <span className="font-bold text-slate-700 tracking-tight">UMTCEMS</span>
          </div>
          <div className="text-slate-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Universiti Malaysia Terengganu. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;