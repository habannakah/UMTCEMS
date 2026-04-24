import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { CheckCircle, FileText, LayoutDashboard } from 'lucide-react';

const SubmitProposal: React.FC = () => {
  const { user } = useAuth();
  const { addProposal } = useData();
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

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addProposal({
      ...formData,
      clubName: user.clubName || 'Unknown Club',
      submitterName: user.name,
      dateSubmitted: new Date().toISOString().split('T')[0],
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto mt-12 px-4">
        <div className="bg-white rounded-2xl shadow-floating border border-surface-200 p-8 text-center transform transition-all animate-[fadeIn_0.5s_ease-out]">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-sm">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-surface-900 mb-2">Submission Successful!</h2>
          <p className="text-surface-500 mb-8 text-lg">
            Your event proposal <span className="font-semibold text-surface-900">"{formData.title}"</span> has been submitted.
            <br />
            Current Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-bold bg-umt-paper text-umt-navy mt-2 border border-umt-navy/15">Pending Advisor</span>
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/proposals')}
              className="w-full py-3.5 bg-umt-navy text-white rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center shadow-elevated hover:shadow-floating hover:-translate-y-0.5"
            >
              <FileText size={20} className="mr-2" /> Track Proposal Status
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-3.5 bg-white border border-surface-200 text-surface-700 rounded-xl font-bold hover:bg-surface-50 transition flex items-center justify-center shadow-sm hover:shadow-md"
            >
              <LayoutDashboard size={20} className="mr-2" /> Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 pb-6 border-b border-surface-200">
        <h1 className="text-3xl font-display font-bold text-surface-900">Submit Event Proposal</h1>
        <p className="font-medium text-surface-500 mt-2">Fill in the details to request approval for your club event.</p>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-surface-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">1</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Event Information</h3>
                  <p className="text-sm font-medium text-surface-500">Name the event, confirm ownership, and set the date.</p>
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
                placeholder="e.g. Annual Tech Symposium"
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
                  <p className="text-sm font-medium text-surface-500">Clarify where the event happens and who it serves.</p>
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
                placeholder="e.g. Auditorium UMT"
                value={formData.venue}
                onChange={handleChange}
              />
              <p className="text-xs text-surface-400 mt-1.5 font-medium">Note: This does not book the venue automatically.</p>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-bold text-surface-700 mb-1.5">Target Participants</label>
              <input
                type="text"
                name="participants"
                required
                className="w-full px-4 py-2.5 border border-surface-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                placeholder="e.g. 200 Students from CS Faculty"
                value={formData.participants}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-3 pt-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">3</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Proposal Details</h3>
                  <p className="text-sm font-medium text-surface-500">Explain the purpose, activity flow, and expected impact.</p>
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
                placeholder="Why are you organizing this event?"
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
                placeholder="Provide a brief schedule or description..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <div className="flex items-center gap-3 pt-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-umt-navy text-white text-sm font-extrabold">4</span>
                <div>
                  <h3 className="font-display font-semibold text-lg text-surface-900">Budget & Logistics</h3>
                  <p className="text-sm font-medium text-surface-500">Document resources, organizers, equipment, and support files.</p>
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
                placeholder="Provide a breakdown of the estimated budget..."
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
                placeholder="List the key committee members and their roles..."
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
                placeholder="List any equipment, transportation, or logistics required..."
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
                placeholder="What are the expected benefits or outcomes of this event?"
                value={formData.outcomes}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2 border-t border-surface-100 pt-6">
              <h3 className="font-display font-semibold text-surface-900 mb-2">Supporting Files</h3>
              <div className="rounded-xl border border-surface-200 bg-surface-50/70 p-4 text-sm font-medium text-surface-600">
                Optional supporting documents belong in the shared schema now, but the actual upload flow is still waiting on the assigned module to be finished.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 text-surface-600 font-semibold mr-4 hover:bg-surface-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-umt-navy text-white font-semibold rounded-lg hover:bg-blue-900 transition shadow-elevated hover:-translate-y-0.5"
            >
              Submit Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProposal;
