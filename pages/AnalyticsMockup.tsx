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

const COLORS = ['#2D58A6', '#f4a261', '#0B1C38', '#e2e8f0'];

const StatCard = ({ icon: Icon, label, value }: any) => (
  <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft hover:shadow-floating transition-all duration-500 ease-out-expo flex flex-col items-center text-center transform hover:-translate-y-1">
    <div className="p-3 bg-umt-navy/5 text-umt-navy rounded-xl mb-4 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors duration-300">
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <p className="text-4xl font-display font-bold text-surface-900 mb-1 tracking-tight">{value}</p>
    <p className="text-[12px] font-semibold text-surface-500 uppercase tracking-widest">{label}</p>
  </div>
);

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md border border-surface-200 p-4 rounded-lg shadow-elevated">
        <p className="font-semibold text-surface-900 mb-2 text-[14px]">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[13px] font-medium flex items-center" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }}></span>
            {entry.name}: <span className="font-semibold ml-1">{entry.value}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft lg:col-span-2 transition-all duration-500 ease-out-expo hover:shadow-elevated">
          <h2 className="text-xl font-display font-bold text-surface-900 mb-6 tracking-tight flex items-center">
            MPP Review Volume <span className="text-[14px] font-medium text-surface-500 ml-2 bg-surface-50 px-2 py-0.5 rounded-md border border-surface-100">{selectedClub}</span>
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={submissionVolume} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#D5DFEB" vertical={false} />
                <XAxis dataKey="month" stroke="#8DA6C1" tick={{ fill: '#546F90', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#8DA6C1" tick={{ fill: '#546F90', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#B4C4D8', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Line type="monotone" dataKey="volume" name="Proposals Received" stroke="#2D58A6" strokeWidth={3} dot={{ r: 5, fill: '#ffffff', stroke: '#2D58A6', strokeWidth: 2 }} activeDot={{ r: 7, fill: '#2D58A6', stroke: '#ffffff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft transition-all duration-500 ease-out-expo hover:shadow-elevated">
          <h2 className="text-xl font-display font-bold text-surface-900 mb-6 tracking-tight">MPP Approval Status</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={6} dataKey="value" stroke="none">
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', color: '#546F90', paddingTop: '20px' }} />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft lg:col-span-2 transition-all duration-500 ease-out-expo hover:shadow-elevated">
          <h2 className="text-xl font-display font-bold text-surface-900 mb-6 tracking-tight">Proposals by Club (System Wide)</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clubData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#D5DFEB" vertical={false} />
                <XAxis dataKey="name" stroke="#8DA6C1" tick={{ fill: '#546F90', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#8DA6C1" tick={{ fill: '#546F90', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#F5F7FA' }} />
                <Bar dataKey="Proposals" fill="#0B1C38" radius={[6, 6, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 border border-surface-200 rounded-xl shadow-soft transition-all duration-500 ease-out-expo hover:shadow-elevated">
          <h2 className="text-xl font-display font-bold text-surface-900 mb-6 tracking-tight">Overall System Status</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={6} dataKey="value" stroke="none">
                  {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', color: '#546F90', paddingTop: '20px' }} />
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
      <div className="p-12 text-center bg-white border border-surface-200 shadow-soft rounded-xl max-w-md mx-auto mt-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <XCircle size={32} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-display font-bold text-surface-900 mb-2 tracking-tight">Access Denied</h2>
        <p className="text-[15px] font-medium text-surface-500">You do not have permission to view the Analytics page.</p>
      </div>
    );
  }

  const handleGenerateReport = () => {
    // In a real app, this would trigger a PDF download or API call
    alert(`Generating Analysis Report for ${selectedClub}...`);
  };

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">

      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-surface-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900 tracking-tight mb-2">System Analytics</h1>
          <p className="font-medium text-[15px] text-surface-500">
            Overview of proposal statuses and system activity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <select
              className="px-4 py-3 pl-4 pr-10 border border-surface-200 bg-white font-semibold text-[14px] text-surface-700 outline-none shadow-sm hover:shadow-md hover:border-surface-300 rounded-lg cursor-pointer appearance-none transition-all duration-200"
              value={selectedClub}
              onChange={(e) => setSelectedClub(e.target.value)}
            >
              <option value="All Clubs">All Clubs</option>
              <option value="Computer Science Club">Computer Science Club</option>
              <option value="Robotics Club">Robotics Club</option>
              <option value="Debate Club">Debate Club</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-surface-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            className="flex items-center justify-center gap-2 bg-umt-navy text-white px-5 py-3 rounded-lg font-semibold text-[14px] hover:bg-blue-900 transition-all duration-300 shadow-elevated hover:shadow-floating hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft"
          >
            <Download size={18} strokeWidth={2} />
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
