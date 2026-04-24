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

  if (isLoading) return <div className="p-8 text-center font-medium text-surface-500">Loading proposal data...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={() => navigate(`/proposals/${id}`)}
        className="flex items-center text-surface-500 hover:text-surface-800 mb-4 transition font-semibold"
      >
        <ArrowLeft size={18} className="mr-2" /> Back to Details
      </button>

      <div className="mb-6 pb-6 border-b border-surface-200">
        <h1 className="text-3xl font-display font-bold text-surface-900">Edit & Resubmit Proposal</h1>
        <div className="flex items-center mt-3 text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-xl text-sm shadow-soft">
            <AlertCircle size={20} className="mr-2 flex-shrink-0" />
            <p>Resubmitting will set the status back to <strong>Pending Advisor</strong> for review.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-surface-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">1</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Event Information</h3>
                  <p className="text-sm font-medium text-surface-500">Check the title, club ownership, and proposed date.</p>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Event Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Club Name</label>
              <input
                type="text"
                disabled
                value={user?.clubName}
                className="w-full px-4 py-2.5 border border-surface-200 bg-surface-50 rounded-lg text-surface-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Event Date</label>
              <input
                type="date"
                name="eventDate"
                required
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-3 pt-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">2</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Venue & Audience</h3>
                  <p className="text-sm font-medium text-surface-500">Revise the location and target participants where needed.</p>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Venue</label>
              <input
                type="text"
                name="venue"
                required
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.venue}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Target Participants</label>
              <input
                type="text"
                name="participants"
                required
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.participants}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-3 pt-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">3</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Proposal Details</h3>
                  <p className="text-sm font-medium text-surface-500">Improve the rationale, activity flow, and outcomes.</p>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Objective</label>
              <textarea
                name="objective"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.objective}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Description / Tentative</label>
              <textarea
                name="description"
                required
                rows={5}
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-3 pt-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">4</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Budget & Logistics</h3>
                  <p className="text-sm font-medium text-surface-500">Make resource requests and supporting details clear for reviewers.</p>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Budget / Financial Requirements</label>
              <textarea
                name="budget"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Committee Members / Organizers</label>
              <textarea
                name="committee"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.committee}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Equipment / Logistics Needed</label>
              <textarea
                name="logistics"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.logistics}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Expected Outcomes</label>
              <textarea
                name="outcomes"
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                value={formData.outcomes}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2 border-t border-surface-100 pt-6">
              <h3 className="font-display font-semibold text-surface-900 mb-2">Supporting Files</h3>
              <div className="rounded-xl border border-surface-200 bg-surface-50 p-4 text-sm font-medium text-surface-600">
                Supporting file storage is part of the shared schema, but the actual resubmission upload flow still needs to be completed in the assigned feature module.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate(`/proposals/${id}`)}
              className="px-6 py-2.5 text-surface-600 font-semibold mr-4 hover:bg-surface-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-umt-navy text-white font-semibold rounded-lg hover:bg-blue-900 transition shadow-elevated hover:-translate-y-0.5"
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
