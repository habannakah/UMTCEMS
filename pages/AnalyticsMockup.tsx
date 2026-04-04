import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { 
  FileText, CheckCircle, Clock, XCircle, 
  Activity, Users, FileBarChart, Calendar,
  TrendingUp, Award
} from 'lucide-react';

const COLORS = ['#333333', '#666666', '#999999', '#cccccc'];

export default function AnalyticsMockup() {
  const { user } = useAuth();

  // Mock Data
  const summaryStats = [
    { label: 'Proposals Submitted', value: '12', icon: FileText },
    { label: 'Reviews Completed', value: '5', icon: CheckCircle },
    { label: 'Reports Submitted', value: '8', icon: FileBarChart },
    { label: 'Club Memberships', value: '2', icon: Users },
    { label: 'Approval Rate', value: '85%', icon: Award },
    { label: 'Total Activity', value: '156', icon: Activity },
  ];

  const statusData = [
    { name: 'Approved', value: 8 },
    { name: 'Pending', value: 3 },
    { name: 'Rejected', value: 1 },
  ];

  const activityData = [
    { month: 'Jan', proposals: 2, reviews: 1 },
    { month: 'Feb', proposals: 4, reviews: 2 },
    { month: 'Mar', proposals: 3, reviews: 0 },
    { month: 'Apr', proposals: 5, reviews: 3 },
    { month: 'May', proposals: 2, reviews: 1 },
    { month: 'Jun', proposals: 6, reviews: 4 },
  ];

  const recentProposals = [
    { id: 'PROP-001', title: 'Annual Tech Symposium', status: 'Approved', date: '2026-03-15' },
    { id: 'PROP-002', title: 'Coding Bootcamp', status: 'Pending', date: '2026-03-28' },
    { id: 'PROP-003', title: 'Guest Lecture Series', status: 'Approved', date: '2026-04-01' },
  ];

  const activityFeed = [
    { id: 1, action: 'Submitted Post-Event Report', target: 'Annual Tech Symposium', time: '2 hours ago' },
    { id: 2, action: 'Reviewed Proposal', target: 'Esports Tournament', time: '1 day ago' },
    { id: 3, action: 'Created Proposal', target: 'Guest Lecture Series', time: '3 days ago' },
    { id: 4, action: 'Joined Club', target: 'Computer Science Society', time: '1 week ago' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. Hero / Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Analytics</h1>
          <p className="text-slate-600">
            Personalized dashboard and activity summary for <span className="font-bold">{user?.name || 'User'}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center border">
            <UserAvatar name={user?.name || 'U'} />
          </div>
          <div>
            <p className="font-bold text-sm">{user?.name || 'Current User'}</p>
            <p className="text-xs text-slate-500">{user?.role || 'Member'}</p>
          </div>
        </div>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {summaryStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border flex flex-col items-center text-center">
            <div className="p-3 bg-slate-50 rounded-full border mb-3">
              <stat.icon size={24} />
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-slate-600 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Over Time (Spans 2 columns) */}
        <div className="bg-white p-6 rounded-xl border lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Activity Over Time</h2>
            <TrendingUp size={20} className="text-slate-400" />
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#e5e5e5" />
                <XAxis dataKey="month" stroke="#333333" tick={{ fill: '#333333' }} />
                <YAxis stroke="#333333" tick={{ fill: '#333333' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #333333', borderRadius: '0' }}
                  itemStyle={{ color: '#333333' }}
                />
                <Legend iconType="square" />
                <Line type="monotone" dataKey="proposals" name="Proposals" stroke="#333333" strokeWidth={3} dot={{ r: 4, fill: '#ffffff', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="reviews" name="Reviews" stroke="#999999" strokeWidth={3} dot={{ r: 4, fill: '#ffffff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proposal Status Breakdown */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-6">Proposal Status</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="#333333"
                  strokeWidth={2}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '2px solid #333333', borderRadius: '0' }}
                  itemStyle={{ color: '#333333' }}
                />
                <Legend iconType="square" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4 & 5. Detail Panels and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Proposals */}
        <div className="bg-white p-6 rounded-xl border lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Proposals</h2>
            <button className="text-sm font-bold underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b-2 border-slate-800">ID</th>
                  <th className="p-3 border-b-2 border-slate-800">Title</th>
                  <th className="p-3 border-b-2 border-slate-800">Date</th>
                  <th className="p-3 border-b-2 border-slate-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentProposals.map((prop, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-b border-slate-200 font-mono text-sm">{prop.id}</td>
                    <td className="p-3 border-b border-slate-200 font-bold">{prop.title}</td>
                    <td className="p-3 border-b border-slate-200 text-sm">{prop.date}</td>
                    <td className="p-3 border-b border-slate-200">
                      <span className="px-2 py-1 text-xs border rounded-full font-bold">
                        {prop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-slate-800 border"></div>
                  <div className="w-0.5 h-full bg-slate-200 mx-auto mt-2"></div>
                </div>
                <div>
                  <p className="font-bold text-sm">{item.action}</p>
                  <p className="text-sm text-slate-600">{item.target}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function UserAvatar({ name }: { name: string }) {
  return <span className="text-xl font-bold">{name.charAt(0).toUpperCase()}</span>;
}
