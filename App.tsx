import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import SubmitProposal from './pages/SubmitProposal';
import ProposalDetails from './pages/ProposalDetails';
import PostEventReport from './pages/PostEventReport';
import Profile from './pages/Profile';
import EditProposal from './pages/EditProposal';
import ApprovedEvents from './pages/ApprovedEvents';
import AnalyticsMockup from './pages/AnalyticsMockup';

// Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} />
            <Route path="/login" element={<Auth mode="login" />} />
            <Route path="/register" element={<Auth mode="register" />} />
            
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsMockup /></ProtectedRoute>} />
            <Route path="/submit-proposal" element={<ProtectedRoute><SubmitProposal /></ProtectedRoute>} />
            <Route path="/proposals" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Reusing dashboard list logic for simplified demo */}
            <Route path="/proposals/:id" element={<ProtectedRoute><ProposalDetails /></ProtectedRoute>} />
            <Route path="/proposals/:id/edit" element={<ProtectedRoute><EditProposal /></ProtectedRoute>} />
            <Route path="/reviews" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Reusing dashboard logic */}
            <Route path="/reports" element={<ProtectedRoute><PostEventReport /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><ApprovedEvents /></ProtectedRoute>} />
            
            {/* Fallback */}
            <Route path="/notifications" element={<ProtectedRoute><div className="p-8 text-center text-slate-500">No new notifications</div></ProtectedRoute>} />
        </Routes>
    );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;