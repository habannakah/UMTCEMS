import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

interface AuthProps {
  mode: 'login' | 'register';
}

const Auth: React.FC<AuthProps> = ({ mode }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [matricId, setMatricId] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CLUB_REP);
  const [selectedClub, setSelectedClub] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear state when mode changes
  useEffect(() => {
    setError('');
    setSuccess('');
    setEmail('');
    setPassword('');
    setFullName('');
    setMatricId('');
    setSelectedClub('');
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'register') {
      // Registration Logic
      if (!fullName || !matricId) {
        setError('Please fill in all fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if ((selectedRole === UserRole.CLUB_REP || selectedRole === UserRole.ADVISOR) && !selectedClub) {
        setError('Please select a club.');
        return;
      }

      // Simulate successful registration
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      return;
    }

    // Login Logic
    if (!email || !password) {
      setError('Invalid email or password.');
      return;
    }

    // In a real app, this would be an API call verifying credentials
    setSuccess('Login successful!');
    login(email, selectedRole);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-umt-paper paper-grid flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-umt-accent via-umt-light to-umt-reed"></div>

      <div className="max-w-5xl w-full bg-white rounded-xl shadow-floating border border-umt-navy/10 relative z-10 overflow-hidden grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative p-8 sm:p-10">
          <div className="absolute inset-x-8 top-0 h-px bg-umt-accent/60"></div>
          <div className="text-center mb-8">
            <div className="umt-mark inline-flex items-center justify-center w-14 h-14 rounded-md bg-white mb-5 shadow-sm ring-1 ring-umt-navy/10 overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <img src="/umt.png" alt="UMT logo" className="h-11 w-11 object-contain" />
            </div>
            <h2 className="text-3xl font-display font-bold text-umt-ink tracking-tight">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-surface-600 mt-2 font-medium">{mode === 'login' ? 'Sign in to manage your club events' : 'Join the system to manage events'}</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6 border border-red-200 flex items-start space-x-2.5">
              <svg className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span className="font-medium leading-tight">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 text-sm p-4 rounded-lg mb-6 border border-green-200 flex items-start space-x-2.5">
              <svg className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span className="font-medium leading-tight">{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-bold text-surface-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-umt-paper/50 border border-umt-navy/10 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-surface-700 mb-1.5">Matric ID / Staff ID</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 bg-umt-paper/50 border border-umt-navy/10 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all"
                  value={matricId}
                  onChange={(e) => setMatricId(e.target.value)}
                  placeholder="e.g. S12345"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-surface-700 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2.5 bg-umt-paper/50 border border-umt-navy/10 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@umt.edu.my"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-bold text-surface-700">Password</label>
              {mode === 'login' && <a href="#" className="text-xs font-medium text-umt-light hover:underline">Forgot password?</a>}
            </div>
            <input
              type="password"
              required
            className="w-full px-4 py-2.5 bg-umt-paper/50 border border-umt-navy/10 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-surface-700 mb-1.5">Role</label>
            <div className="relative">
              <select
                className="w-full px-4 py-2.5 bg-umt-paper/50 border border-umt-navy/10 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all appearance-none cursor-pointer"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              >
                <option value={UserRole.CLUB_REP}>Club Representative</option>
                <option value={UserRole.ADVISOR}>Club Advisor</option>
                <option value={UserRole.MPP_EXCO}>MPP Club EXCO</option>
                <option value={UserRole.HEPA_STAFF}>HEPA Staff</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {mode === 'register' && (selectedRole === UserRole.CLUB_REP || selectedRole === UserRole.ADVISOR) && (
            <div>
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Select Club</label>
              <div className="relative">
                <select
                  required
                  className="w-full px-4 py-2.5 bg-umt-paper/50 border border-umt-navy/10 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all appearance-none cursor-pointer"
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                >
                  <option value="" disabled>Select a club...</option>
                  <option value="Computer Science Society">Computer Science Society</option>
                  <option value="Robotics Club">Robotics Club</option>
                  <option value="Debate Club">Debate Club</option>
                  <option value="Photography Society">Photography Society</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-umt-navy text-white py-3 rounded-lg font-extrabold hover:bg-umt-ink transition-all shadow-elevated hover:shadow-floating hover:-translate-y-0.5 mt-8"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 font-medium">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => navigate('/register')} className="text-umt-navy font-bold hover:underline transition-all">Register here</button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-umt-navy font-bold hover:underline transition-all">Sign In</button>
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:block relative min-h-[650px] bg-umt-navy">
          <img
            src="/images/umt-approval-workspace.png"
            alt="Event approval workspace with dashboard, proposal papers, and planning tools"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-umt-navy via-umt-navy/72 to-umt-navy/10"></div>
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-umt-accent drop-shadow-sm">Approval Workspace</p>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">Everything ready before review.</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              Proposal records, calendars, documents, and approvals stay visible in one coordinated event flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
