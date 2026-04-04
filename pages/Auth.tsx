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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-umt-navy text-white font-bold text-xl mb-4">U</div>
          <h2 className="text-2xl font-bold text-slate-800">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-slate-500 mt-1">{mode === 'login' ? 'Sign in to access UCEMS' : 'Join UCEMS to manage events'}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100 flex items-center justify-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg mb-4 border border-green-100 flex items-center justify-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light focus:border-umt-light outline-none transition"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Matric ID / Staff ID</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light focus:border-umt-light outline-none transition"
                  value={matricId}
                  onChange={(e) => setMatricId(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light focus:border-umt-light outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light focus:border-umt-light outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light focus:border-umt-light outline-none transition bg-white"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
            >
              <option value={UserRole.CLUB_REP}>Club Representative</option>
              <option value={UserRole.ADVISOR}>Club Advisor</option>
              <option value={UserRole.MPP_EXCO}>MPP Club EXCO</option>
              <option value={UserRole.HEPA_STAFF}>HEPA Staff</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-umt-navy text-white py-2.5 rounded-lg font-semibold hover:bg-blue-900 transition shadow-md mt-6"
          >
            {mode === 'login' ? 'Sign In' : 'Register'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} className="text-umt-light font-semibold hover:underline">Register</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => navigate('/login')} className="text-umt-light font-semibold hover:underline">Sign In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;