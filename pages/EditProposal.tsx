import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { ProposalStatus, UserRole } from '../types';

const EditProposal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { proposals, editProposal } = useData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    eventDate: '',
    venue: '',
    objective: '',
    participants: '',
    description: '',
    budget: '',
    committee: '',
    logistics: '',
    outcomes: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load existing data
  useEffect(() => {
    if (id && proposals.length > 0) {
      const proposal = proposals.find(p => p.id === id);
      if (proposal) {
        // Security check
        if (user?.role !== UserRole.CLUB_REP || proposal.clubName !== user.clubName) {
           navigate('/dashboard');
           return;
        }
        
        setFormData({
            title: proposal.title,
            eventDate: proposal.eventDate,
            venue: proposal.venue,
            objective: proposal.objective,
            participants: proposal.participants,
            description: proposal.description,
            budget: proposal.budget || '',
            committee: proposal.committee || '',
            logistics: proposal.logistics || '',
            outcomes: proposal.outcomes || '',
        });
        setIsLoading(false);
      } else {
          navigate('/dashboard');
      }
    }
  }, [id, proposals, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Call edit function
    editProposal(id, formData);
    navigate(`/proposals/${id}`);
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading proposal data...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(`/proposals/${id}`)}
        className="flex items-center text-slate-500 hover:text-slate-700 mb-4 transition"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Details
      </button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Edit & Resubmit Proposal</h1>
        <div className="flex items-center mt-2 text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-lg text-sm">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <p>Resubmitting will set the status back to <strong>Pending Advisor</strong> for review.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Club Name</label>
              <input
                type="text"
                disabled
                value={user?.clubName}
                className="w-full px-4 py-2 border border-slate-200 bg-slate-50 rounded-lg text-slate-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Event Date</label>
              <input
                type="date"
                name="eventDate"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
              <input
                type="text"
                name="venue"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Participants</label>
              <input
                type="text"
                name="participants"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.participants}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Objective</label>
              <textarea
                name="objective"
                required
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.objective}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description / Tentative</label>
              <textarea
                name="description"
                required
                rows={5}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Budget / Financial Requirements</label>
              <textarea
                name="budget"
                required
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Committee Members / Organizers</label>
              <textarea
                name="committee"
                required
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.committee}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Equipment / Logistics Needed</label>
              <textarea
                name="logistics"
                required
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.logistics}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Expected Outcomes</label>
              <textarea
                name="outcomes"
                required
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.outcomes}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2 border-t border-slate-100 pt-6">
              <h3 className="font-medium text-slate-800 mb-2">Supporting Files</h3>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Supporting file storage is part of the shared schema, but the actual resubmission upload flow still needs to be completed in the assigned feature module.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate(`/proposals/${id}`)}
              className="px-6 py-2.5 text-slate-600 font-medium mr-4 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-umt-navy text-white font-medium rounded-lg hover:bg-blue-900 transition shadow-sm"
            >
              Update & Resubmit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProposal;
