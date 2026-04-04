import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ProposalStatus } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { Calendar, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApprovedEvents: React.FC = () => {
  const { proposals } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter for Approved or Completed events
  // Sort by event date (ascending - upcoming first)
  const approvedEvents = proposals
    .filter(p =>
      (p.status === ProposalStatus.APPROVED || p.status === ProposalStatus.COMPLETED) &&
      (p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.clubName.toLowerCase().includes(searchTerm.toLowerCase()) || 
       p.venue.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Approved Events</h1>
          <p className="text-slate-500">Official calendar of upcoming and completed university club events.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search events, clubs, venues..."
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none w-full md:w-80 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Event Title</th>
                <th className="px-6 py-4 font-semibold">Organized By</th>
                <th className="px-6 py-4 font-semibold">Venue</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {approvedEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                       <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <Calendar size={32} className="text-slate-400" />
                       </div>
                       <h3 className="text-lg font-medium text-slate-700">No events found</h3>
                       <p className="text-slate-500 mt-1">There are no approved events matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                approvedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50 transition group">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-700">
                      {event.eventDate}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {event.clubName}
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1.5 text-slate-400" />
                        {event.venue}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={event.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/proposals/${event.id}`)}
                        className="text-umt-light font-medium hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovedEvents;