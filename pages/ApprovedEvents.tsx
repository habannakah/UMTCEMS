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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-200">
        <div>
          <h1 className="text-3xl font-display font-bold text-surface-900">Approved Events</h1>
          <p className="font-medium text-surface-500 mt-2">Official calendar of upcoming and completed university club events.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-surface-400" size={20} />
          <input
            type="text"
            placeholder="Search events, clubs, venues..."
            className="pl-10 pr-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none w-full md:w-80 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-surface-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-50 text-surface-600 border-b border-surface-100">
              <tr>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Date</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Event Title</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Organized By</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Venue</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Status</th>
                <th className="px-6 py-4 font-extrabold uppercase tracking-[0.12em] text-[12px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {approvedEvents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-surface-500">
                    <div className="flex flex-col items-center justify-center">
                       <div className="w-16 h-16 bg-umt-paper rounded-full flex items-center justify-center mb-4 border border-umt-navy/10">
                          <Calendar size={32} className="text-umt-navy" />
                       </div>
                       <h3 className="text-lg font-display font-semibold text-surface-900">No events found</h3>
                       <p className="text-surface-500 mt-1">There are no approved events matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                approvedEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-surface-50 transition group">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-surface-700">
                      {event.eventDate}
                    </td>
                    <td className="px-6 py-4 font-semibold text-surface-900">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 text-surface-600 font-medium">
                      {event.clubName}
                    </td>
                    <td className="px-6 py-4 text-surface-500">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1.5 text-umt-accent" />
                        {event.venue}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={event.status} />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/proposals/${event.id}`)}
                        className="text-umt-navy font-bold hover:text-umt-light bg-umt-paper px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-umt-navy/10"
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
