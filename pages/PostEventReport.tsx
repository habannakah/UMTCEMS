import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ProposalStatus, UserRole } from '../types';
import { UploadCloud, CheckCircle, Image as ImageIcon, LayoutDashboard, FileText, Download, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportViewer = () => {
    const { user } = useAuth();
    const { proposals } = useData();
    const navigate = useNavigate();

    // Filter completed proposals based on role
    let completedProposals = proposals.filter(p => p.status === ProposalStatus.COMPLETED && p.postEventReport);

    if (user?.role === UserRole.ADVISOR) {
        completedProposals = completedProposals.filter(p => p.clubName === user.clubName);
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Post-Event Reports</h1>
                <p className="font-bold text-lg text-slate-600">
                    {user?.role === UserRole.ADVISOR 
                        ? `Review completed event reports for ${user.clubName}.` 
                        : 'System-wide archive of completed event reports.'}
                </p>
            </div>

            {completedProposals.length === 0 ? (
                <div className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                    <p className="font-bold text-lg">No post-event reports available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedProposals.map(p => (
                        <div key={p.id} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                            <div className="p-5 border-b-2 border-black bg-slate-50">
                                <h3 className="font-bold text-xl mb-1 line-clamp-1">{p.title}</h3>
                                <p className="text-sm font-bold text-slate-600">{p.clubName}</p>
                            </div>
                            <div className="p-5 flex-1 space-y-4">
                                <div className="flex items-center text-sm font-bold">
                                    <Calendar size={16} className="mr-2" /> Event Date: {p.eventDate}
                                </div>
                                <div className="flex items-center text-sm font-bold">
                                    <Users size={16} className="mr-2" /> Participants: {p.participants}
                                </div>
                                <div className="flex items-center text-sm font-bold">
                                    <CheckCircle size={16} className="mr-2" /> Submitted: {p.postEventReport?.submittedDate}
                                </div>
                            </div>
                            <div className="p-5 border-t-2 border-black bg-slate-50 flex flex-col gap-3">
                                <button 
                                    onClick={() => alert(`Downloading ${p.postEventReport?.reportFile}...`)}
                                    className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2 font-bold hover:bg-slate-800 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <Download size={18} /> Save report
                                </button>
                                <button 
                                    onClick={() => navigate(`/proposals/${p.id}`)}
                                    className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-2 font-bold hover:bg-slate-100 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <FileText size={18} /> View Original Proposal
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const PostEventReport: React.FC = () => {
    const { user } = useAuth();
    const { proposals, submitReport } = useData();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedProposalId, setSelectedProposalId] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [success, setSuccess] = useState(false);

    if (user?.role !== UserRole.CLUB_REP) {
        return <ReportViewer />;
    }

    // Filter proposals that are APPROVED but not yet COMPLETED
    const eligibleProposals = proposals.filter(p => 
        p.clubName === user?.clubName && 
        p.status === ProposalStatus.APPROVED
    );

    const completedProposals = proposals.filter(p => 
        p.clubName === user?.clubName && 
        p.status === ProposalStatus.COMPLETED && 
        p.postEventReport
    );

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
                            onClick={() => {
                                setSuccess(false);
                                setIsSubmitting(false);
                                setSelectedProposalId('');
                                setFile(null);
                            }}
                            className="w-full py-3.5 bg-umt-navy text-white rounded-xl font-bold hover:bg-blue-900 transition flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                            <FileText size={20} className="mr-2" /> View My Reports
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

    if (!isSubmitting) {
        return (
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Post-Event Reports</h1>
                        <p className="font-bold text-lg text-slate-600">
                            Manage and view your club's submitted event reports.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsSubmitting(true)}
                        className="bg-black text-white px-6 py-3 font-bold hover:bg-slate-800 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Submit New Report
                    </button>
                </div>

                {completedProposals.length === 0 ? (
                    <div className="bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                        <p className="font-bold text-lg">You haven't submitted any post-event reports yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedProposals.map(p => (
                            <div key={p.id} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                                <div className="p-5 border-b-2 border-black bg-slate-50">
                                    <h3 className="font-bold text-xl mb-1 line-clamp-1">{p.title}</h3>
                                    <p className="text-sm font-bold text-slate-600">{p.clubName}</p>
                                </div>
                                <div className="p-5 flex-1 space-y-4">
                                    <div className="flex items-center text-sm font-bold">
                                        <Calendar size={16} className="mr-2" /> Event Date: {p.eventDate}
                                    </div>
                                    <div className="flex items-center text-sm font-bold">
                                        <Users size={16} className="mr-2" /> Participants: {p.participants}
                                    </div>
                                    <div className="flex items-center text-sm font-bold">
                                        <CheckCircle size={16} className="mr-2" /> Submitted: {p.postEventReport?.submittedDate}
                                    </div>
                                </div>
                                <div className="p-5 border-t-2 border-black bg-slate-50 flex flex-col gap-3">
                                    <button 
                                        onClick={() => alert(`Downloading ${p.postEventReport?.reportFile}...`)}
                                        className="w-full flex items-center justify-center gap-2 bg-black text-white px-4 py-2 font-bold hover:bg-slate-800 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <Download size={18} /> Save report
                                    </button>
                                    <button 
                                        onClick={() => navigate(`/proposals/${p.id}`)}
                                        className="w-full flex items-center justify-center gap-2 bg-white text-black px-4 py-2 font-bold hover:bg-slate-100 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <FileText size={18} /> View Original Proposal
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Submit Post-Event Report</h1>
                <button 
                    onClick={() => setIsSubmitting(false)}
                    className="text-sm font-bold underline hover:text-slate-600"
                >
                    Cancel
                </button>
            </div>
            
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