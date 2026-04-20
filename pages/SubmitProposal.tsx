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
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center transform transition-all animate-[fadeIn_0.5s_ease-out]">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} strokeWidth={2.5} />
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Submission Successful!</h2>
          <p className="text-slate-500 mb-8 text-lg">
            Your event proposal <span className="font-semibold text-slate-800">"{formData.title}"</span> has been submitted.
            <br />
            Current Status: <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-slate-100 text-slate-800 mt-2 border border-slate-200">Pending Advisor</span>
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/proposals')}
              className="w-full py-3.5 bg-umt-navy text-white rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <FileText size={20} className="mr-2" /> Track Proposal Status
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-3.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition flex items-center justify-center"
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Submit Event Proposal</h1>
        <p className="text-slate-500">Fill in the details to request approval for your club event.</p>
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
                placeholder="e.g. Annual Tech Symposium"
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
                placeholder="e.g. Auditorium UMT"
                value={formData.venue}
                onChange={handleChange}
              />
              <p className="text-xs text-slate-400 mt-1">Note: This does not book the venue automatically.</p>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Target Participants</label>
              <input
                type="text"
                name="participants"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                placeholder="e.g. 200 Students from CS Faculty"
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
                placeholder="Why are you organizing this event?"
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
                placeholder="Provide a brief schedule or description..."
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
                placeholder="Provide a breakdown of the estimated budget..."
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
                placeholder="List the key committee members and their roles..."
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
                placeholder="List any equipment, transportation, or logistics required..."
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
                placeholder="What are the expected benefits or outcomes of this event?"
                value={formData.outcomes}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2 border-t border-slate-100 pt-6">
              <h3 className="font-medium text-slate-800 mb-2">Supporting Files</h3>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Optional supporting documents belong in the shared schema now, but the actual upload flow is still waiting on the assigned module to be finished.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 text-slate-600 font-medium mr-4 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 bg-umt-navy text-white font-medium rounded-lg hover:bg-blue-900 transition shadow-sm"
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
