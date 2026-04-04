import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ProposalStatus, UserRole } from '../types';
import { UploadCloud, CheckCircle, Image as ImageIcon, LayoutDashboard, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostEventReport: React.FC = () => {
    const { user } = useAuth();
    const { proposals, submitReport } = useData();
    const navigate = useNavigate();

    // Filter proposals that are APPROVED but not yet COMPLETED
    const eligibleProposals = proposals.filter(p => 
        p.clubName === user?.clubName && 
        p.status === ProposalStatus.APPROVED
    );

    const [selectedProposalId, setSelectedProposalId] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);

    if (user?.role !== UserRole.CLUB_REP) {
        return <div className="p-8 text-center text-slate-500">Only Club Representatives can submit reports.</div>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!selectedProposalId) return;

        // Simulate upload
        submitReport(selectedProposalId, {
            reportFile: file ? file.name : 'report.pdf',
            photos: ['photo1.jpg', 'photo2.jpg']
        });
        setSuccess(true);
    };

    if (success) {
        return (
            <div className="max-w-xl mx-auto mt-12 px-4">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center transform transition-all animate-[fadeIn_0.5s_ease-out]">
                    <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} strokeWidth={2.5} />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Report Submitted!</h2>
                    <p className="text-slate-500 mb-8 text-lg">
                        The event record has been updated to <span className="font-semibold text-slate-800">Completed</span> and archived.
                        <br />
                        Relevant parties can now view the post-event report.
                    </p>
                    
                    <div className="space-y-3">
                        <button 
                            onClick={() => navigate(`/proposals/${selectedProposalId}`)}
                            className="w-full py-3.5 bg-umt-navy text-white rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                            <FileText size={20} className="mr-2" /> View Event Details
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
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Submit Post-Event Report</h1>
            
            {eligibleProposals.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-slate-100">
                    <p className="text-slate-500">You have no approved events pending reports.</p>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Select Event</label>
                            <select 
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none bg-white"
                                value={selectedProposalId}
                                onChange={(e) => setSelectedProposalId(e.target.value)}
                                required
                            >
                                <option value="">-- Choose Event --</option>
                                {eligibleProposals.map(p => (
                                    <option key={p.id} value={p.id}>{p.title} ({p.eventDate})</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Upload Report (PDF)</label>
                            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition cursor-pointer relative">
                                <UploadCloud className="text-slate-400 mb-2" size={32} />
                                <span className="text-sm font-medium text-slate-600">
                                    {file ? file.name : "Click to upload or drag and drop"}
                                </span>
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-2">Event Photos (Optional)</label>
                             <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 flex items-center text-slate-500 text-sm">
                                 <ImageIcon size={20} className="mr-3" />
                                 <span>Supported formats: JPG, PNG. Max 5MB.</span>
                             </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                disabled={!selectedProposalId}
                                className="w-full bg-umt-navy text-white py-3 rounded-lg font-bold hover:bg-blue-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostEventReport;