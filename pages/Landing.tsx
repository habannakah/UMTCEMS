import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, FileText, ShieldCheck } from 'lucide-react';

const Landing: React.FC = () => {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));

    if (!revealItems.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-umt-paper flex flex-col font-sans text-umt-ink">
      <header className="bg-umt-paper/95 backdrop-blur-md border-b border-umt-navy/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="umt-mark w-9 h-9 bg-white rounded-md flex items-center justify-center overflow-hidden ring-1 ring-umt-navy/10">
              <img src="/umt.png" alt="UMT logo" className="h-7 w-7 object-contain" />
            </div>
            <span className="text-xl font-extrabold text-umt-ink tracking-tight">UMTCEMS</span>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/login" className="text-sm font-bold text-umt-ink/70 hover:text-umt-navy transition-colors px-3 py-2 rounded-md hover:bg-white">Log In</Link>
            <Link to="/register" className="text-sm font-bold bg-umt-navy text-white px-4 py-2 rounded-md hover:bg-umt-ink transition-colors shadow-sm">Register</Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-umt-navy text-white py-14 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 paper-grid opacity-20 scroll-drift"></div>
          <div className="absolute -right-20 top-10 hidden lg:block w-96 h-96 border border-white/10 rounded-full campus-stamp"></div>
          <div className="absolute left-6 bottom-6 hidden lg:flex items-end gap-3 opacity-20">
            <div className="w-20 h-28 border border-white/40"></div>
            <div className="w-20 h-40 border border-white/40"></div>
            <div className="w-20 h-24 border border-white/40"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-scroll-reveal>
            <div className="inline-flex items-center space-x-2 bg-white/8 px-3 py-1 rounded-full border border-white/20 mb-6 md:mb-8">
              <span className="h-2 w-2 rounded-full bg-umt-accent"></span>
              <span className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">Live for UMT Clubs</span>
            </div>
            <div className="mx-auto mb-6 md:mb-8 flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-white/20 bg-white shadow-floating overflow-hidden">
              <img src="/umt.png" alt="UMT logo" className="h-12 w-12 md:h-16 md:w-16 object-contain" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-5 md:mb-6 tracking-tight leading-tight">Streamlined Event Management</h1>
            <p className="text-lg md:text-xl text-white/78 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed">
              Your club's proposals, approvals, and post-event reporting handled in one centralized, intelligent platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-umt-accent text-white px-8 py-3.5 rounded-md font-extrabold hover:bg-[#9F5728] transition-all shadow-lg hover:-translate-y-0.5">Get Started</Link>
              <Link to="/login" className="bg-white/10 text-white px-8 py-3.5 rounded-md font-extrabold hover:bg-white/15 transition-all border border-white/25">Sign In</Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-umt-paper">
          <div className="text-center mb-16" data-scroll-reveal>
            <h2 className="text-3xl font-display font-bold text-umt-ink tracking-tight">Everything you need</h2>
            <p className="text-surface-600 mt-4 max-w-2xl mx-auto">Replace endless email chains and physical paperwork with a unified digital workflow.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-soft border border-umt-navy/10 text-center hover:shadow-elevated hover:border-umt-light/40 transition-all group" data-scroll-reveal>
              <div className="w-14 h-14 bg-umt-navy/5 text-umt-navy rounded-md flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:bg-umt-navy/10 transition-transform">
                <FileText size={28} />
              </div>
              <h3 className="text-xl font-display font-semibold text-umt-ink mb-3">Digital Proposals</h3>
              <p className="text-surface-600 leading-relaxed">Submit and track event proposals online. Say goodbye to lost paperwork and manual signatures.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-soft border border-umt-navy/10 text-center hover:shadow-elevated hover:border-umt-reed/50 transition-all group relative" data-scroll-reveal style={{ transitionDelay: '90ms' }}>
              <div className="absolute top-0 inset-x-8 h-px bg-umt-reed opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 bg-umt-reed/10 text-umt-reed rounded-md flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:bg-umt-reed/15 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-display font-semibold text-umt-ink mb-3">Efficient Approvals</h3>
              <p className="text-surface-600 leading-relaxed">Advisors and MPP can review, approve, or request amendments instantly with complete audit trails.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-soft border border-umt-navy/10 text-center hover:shadow-elevated hover:border-umt-accent/50 transition-all group" data-scroll-reveal style={{ transitionDelay: '180ms' }}>
              <div className="w-14 h-14 bg-umt-accent/10 text-umt-accent rounded-md flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:bg-umt-accent/15 transition-transform">
                <ClipboardCheck size={28} />
              </div>
              <h3 className="text-xl font-display font-semibold text-umt-ink mb-3">Event Lifecycle</h3>
              <p className="text-surface-600 leading-relaxed">Monitor event status from draft to completion, including automated post-event report tracking.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-umt-navy/10 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0 opacity-80 hover:opacity-100 transition-opacity">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center overflow-hidden ring-1 ring-umt-navy/10">
              <img src="/umt.png" alt="UMT logo" className="h-5 w-5 object-contain" />
            </div>
            <span className="font-extrabold text-umt-ink tracking-tight">UMTCEMS</span>
          </div>
          <div className="text-surface-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Universiti Malaysia Terengganu. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
