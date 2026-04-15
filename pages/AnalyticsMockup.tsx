import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { UserRole, ProposalStatus } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  FileText, CheckCircle, Clock, XCircle, Download
} from 'lucide-react';

const COLORS = ['#333333', '#666666', '#999999', '#cccccc'];

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white p-6 border-2 border-black flex flex-col items-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
    <div className="p-3 bg-slate-50 border-2 border-black mb-3">
      <Icon size={24} className="text-black" />
    </div>
    <p className="text-3xl font-bold mb-1">{value}</p>
    <p className="text-sm font-bold uppercase tracking-wider">{label}</p>
  </div>
);

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MppAnalyticsDashboard = ({ selectedClub }: { selectedClub: string }) => {
  const { proposals } = useData();

  // Filter proposals based on selected club and user role (MPP only sees post-advisor)
  let mppProposals = selectedClub === 'All Clubs' 
    ? proposals 
    : proposals.filter(p => p.clubName === selectedClub);

  mppProposals = mppProposals.filter(p => {
    if (p.status === ProposalStatus.PENDING_ADVISOR) return false;
    if (p.status === ProposalStatus.NEEDS_IMPROVEMENT && !p.history.some(h => h.status === ProposalStatus.PENDING_MPP)) return false;
    return true;
  });

  const pendingMppCount = mppProposals.filter(p => p.status === ProposalStatus.PENDING_MPP).length;
  const approvedCount = mppProposals.filter(p => p.status === ProposalStatus.APPROVED || p.status === ProposalStatus.COMPLETED).length;
  const revisionsCount = mppProposals.filter(p => p.status === ProposalStatus.NEEDS_IMPROVEMENT).length;
  const rejectedCount = mppProposals.filter(p => p.status === ProposalStatus.REJECTED).length;

  const totalCount = pendingMppCount + approvedCount + revisionsCount + rejectedCount;

  const summaryStats = [
    { label: 'Total Proposals', value: totalCount.toString(), icon: FileText },
    { label: 'Pending MPP', value: pendingMppCount.toString(), icon: Clock },
    { label: 'Approved', value: approvedCount.toString(), icon: CheckCircle },
    { label: 'Rejected / Revisions', value: (rejectedCount + revisionsCount).toString(), icon: XCircle },
  ];

  const statusData = [
    { name: 'Pending MPP', value: pendingMppCount },
    { name: 'Approved', value: approvedCount },
    { name: 'Revisions/Rejected', value: revisionsCount + rejectedCount },
  ];

  // Mock volume data for MPP
  const submissionVolume = [
    { month: 'Aug', volume: 1 },
    { month: 'Sep', volume: 3 },
    { month: 'Oct', volume: 5 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {summaryStats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 border-2 border-black lg:col-span-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold mb-6">MPP Review Volume ({selectedClub})</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={submissionVolume} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#e5e5e5" />
                <XAxis dataKey="month" stroke="#333333" tick={{ fill: '#333333', fontWeight: 'bold' }} />
                <YAxis stroke="#333333" tick={{ fill: '#333333', fontWeight: 'bold' }} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="volume" name="Proposals Received" stroke="#333333" strokeWidth={4} dot={{ r: 6, fill: '#ffffff', strokeWidth: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold mb-6">MPP Approval Status</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="#333333" strokeWidth={2}>
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="square" wrapperStyle={{ fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const HepaAnalyticsDashboard = ({ selectedClub }: { selectedClub: string }) => {
  const { proposals } = useData();

  // HEPA sees everything
  const hepaProposals = selectedClub === 'All Clubs' 
    ? proposals 
    : proposals.filter(p => p.clubName === selectedClub);

  const totalCount = hepaProposals.length;
  const completedCount = hepaProposals.filter(p => p.status === ProposalStatus.COMPLETED).length;
  const activeClubs = new Set(hepaProposals.map(p => p.clubName)).size;
  const complianceIssues = hepaProposals.filter(p => p.comments.some(c => c.type === 'compliance_note')).length;

  const summaryStats = [
    { label: 'Total System Proposals', value: totalCount.toString(), icon: FileText },
    { label: 'Active Clubs', value: activeClubs.toString(), icon: Clock },
    { label: 'Completed Events', value: completedCount.toString(), icon: CheckCircle },
    { label: 'Compliance Notes', value: complianceIssues.toString(), icon: XCircle },
  ];

  // Group by club for HEPA
  const clubDataMap: Record<string, number> = {};
  hepaProposals.forEach(p => {
    clubDataMap[p.clubName] = (clubDataMap[p.clubName] || 0) + 1;
  });
  const clubData = Object.keys(clubDataMap).map(key => ({
    name: key.replace(' Club', '').replace(' Society', '').replace(' Council', ''), // shorten names
    Proposals: clubDataMap[key]
  }));

  const statusData = [
    { name: 'Pending (Any)', value: hepaProposals.filter(p => p.status === ProposalStatus.PENDING_ADVISOR || p.status === ProposalStatus.PENDING_MPP).length },
    { name: 'Approved', value: hepaProposals.filter(p => p.status === ProposalStatus.APPROVED).length },
    { name: 'Completed', value: completedCount },
    { name: 'Rejected/Revisions', value: hepaProposals.filter(p => p.status === ProposalStatus.REJECTED || p.status === ProposalStatus.NEEDS_IMPROVEMENT).length },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {summaryStats.map((stat, idx) => <StatCard key={idx} {...stat} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 border-2 border-black lg:col-span-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold mb-6">Proposals by Club (System Wide)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clubData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#e5e5e5" vertical={false} />
                <XAxis dataKey="name" stroke="#333333" tick={{ fill: '#333333', fontWeight: 'bold', fontSize: 12 }} />
                <YAxis stroke="#333333" tick={{ fill: '#333333', fontWeight: 'bold' }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="Proposals" fill="#333333" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-bold mb-6">Overall System Status</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="#333333" strokeWidth={2}>
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="square" wrapperStyle={{ fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AnalyticsMockup() {
  const { user } = useAuth();
  const [selectedClub, setSelectedClub] = useState('All Clubs');

  // Restrict access to MPP and HEPA only
  if (user?.role === UserRole.CLUB_REP || user?.role === UserRole.ADVISOR) {
    return (
      <div className="p-8 text-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="font-bold">You do not have permission to view the Analytics page.</p>
      </div>
    );
  }

  const handleGenerateReport = () => {
    // In a real app, this would trigger a PDF download or API call
    alert(`Generating Analysis Report for ${selectedClub}...`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">System Analytics</h1>
          <p className="font-bold text-lg">
            Overview of proposal statuses and system activity.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <select 
            className="px-4 py-3 border-2 border-black bg-white font-bold outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
            value={selectedClub}
            onChange={(e) => setSelectedClub(e.target.value)}
          >
            <option value="All Clubs">All Clubs</option>
            <option value="Computer Science Club">Computer Science Club</option>
            <option value="Robotics Club">Robotics Club</option>
            <option value="Debate Club">Debate Club</option>
          </select>

          <button 
            onClick={handleGenerateReport}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 font-bold hover:bg-slate-800 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
          >
            <Download size={20} />
            Generate Analysis Report
          </button>
        </div>
      </div>

      {user?.role === UserRole.MPP_EXCO ? (
        <MppAnalyticsDashboard selectedClub={selectedClub} />
      ) : (
        <HepaAnalyticsDashboard selectedClub={selectedClub} />
      )}

    </div>
  );
}
