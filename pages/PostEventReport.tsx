import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { ProposalStatus, UserRole } from '../types';
    import { UploadCloud, CheckCircle, Image as ImageIcon, LayoutDashboard, FileText, Download, Calendar, Users, Plus } from 'lucide-react';
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
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
            <div className="mb-8 pb-6 border-b border-surface-200">
                <h1 className="text-3xl font-display font-bold text-surface-900 tracking-tight mb-2">Post-Event Reports</h1>
                <p className="font-medium text-[15px] text-surface-500">
                    {user?.role === UserRole.ADVISOR
                        ? `Review completed event reports for ${user.clubName}.`
                        : 'System-wide archive of completed event reports.'}
                </p>
            </div>

            {completedProposals.length === 0 ? (
                <div className="bg-white p-12 border border-surface-200 rounded-xl shadow-soft text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-surface-50 text-surface-400 rounded-full flex items-center justify-center mb-4">
                        <FileText size={32} strokeWidth={1.5} />
                    </div>
                    <p className="font-display font-semibold text-lg text-surface-900">No reports available</p>
                    <p className="text-[15px] text-surface-500 mt-2">There are no completed event reports to display at this time.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedProposals.map(p => (
                        <div key={p.id} className="bg-white border border-surface-200 rounded-xl shadow-soft flex flex-col hover:shadow-floating hover:border-umt-accent/40 transition-all duration-500 ease-out-expo group transform hover:-translate-y-1 overflow-hidden">
                            <div className="p-5 md:p-6 border-b border-surface-100 bg-surface-50/50 group-hover:bg-umt-navy/5 transition-colors duration-300">
                                <h3 className="font-display font-semibold text-lg text-surface-900 mb-1.5 line-clamp-1 group-hover:text-umt-navy transition-colors">{p.title}</h3>
                                <p className="text-[12px] font-semibold text-surface-500 uppercase tracking-widest">{p.clubName}</p>
                            </div>
                            <div className="p-5 md:p-6 flex-1 space-y-4 bg-white">
                                <div className="flex items-center text-[14px] font-medium text-surface-600">
                                    <div className="w-8 h-8 rounded-lg bg-surface-50 flex items-center justify-center mr-3 text-surface-400 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors">
                                        <Calendar size={16} strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-surface-400 uppercase tracking-wider font-semibold mb-0.5">Event Date</span>
                                        <span className="text-surface-900">{p.eventDate}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-[14px] font-medium text-surface-600">
                                    <div className="w-8 h-8 rounded-lg bg-surface-50 flex items-center justify-center mr-3 text-surface-400 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors">
                                        <Users size={16} strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-surface-400 uppercase tracking-wider font-semibold mb-0.5">Participants</span>
                                        <span className="text-surface-900">{p.participants}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-[14px] font-medium text-surface-600">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50/50 flex items-center justify-center mr-3 text-emerald-500 group-hover:bg-emerald-100 transition-colors">
                                        <CheckCircle size={16} strokeWidth={2} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[11px] text-emerald-600/80 uppercase tracking-wider font-semibold mb-0.5">Submitted</span>
                                        <span className="text-surface-900">{p.postEventReport?.submittedDate}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 border-t border-surface-100 bg-surface-50 flex flex-col gap-3">
                                <button
                                    onClick={() => alert(`Downloading ${p.postEventReport?.reportFile}...`)}
                                    className="w-full flex items-center justify-center gap-2 bg-umt-navy text-white px-4 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-blue-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                                >
                                    <Download size={18} strokeWidth={2} /> Save Report
                                </button>
                                <button
                                    onClick={() => navigate(`/proposals/${p.id}`)}
                                    className="w-full flex items-center justify-center gap-2 bg-white text-surface-700 px-4 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-surface-50 hover:text-surface-900 transition-all duration-300 border border-surface-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                                >
                                    <FileText size={18} strokeWidth={2} /> View Original Proposal
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
                <div className="bg-white rounded-2xl shadow-floating border border-surface-200 p-10 text-center transform transition-all animate-[fadeIn_0.5s_ease-out]">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                        <CheckCircle size={48} strokeWidth={2} />
                    </div>

                    <h2 className="text-3xl font-display font-bold text-surface-900 mb-3 tracking-tight">Report Submitted!</h2>
                    <p className="text-surface-500 mb-10 text-[16px] leading-relaxed">
                        The event record has been updated to <span className="font-semibold text-surface-900">Completed</span> and archived.
                        <br />
                        Relevant parties can now view the post-event report.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={() => {
                                setSuccess(false);
                                setIsSubmitting(false);
                                setSelectedProposalId('');
                                setFile(null);
                            }}
                            className="w-full py-3.5 bg-umt-navy text-white rounded-xl font-semibold hover:bg-blue-900 transition-all duration-300 flex items-center justify-center shadow-elevated hover:shadow-floating hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <FileText size={20} className="mr-2" strokeWidth={2} /> View My Reports
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-3.5 bg-white border border-surface-200 text-surface-700 rounded-xl font-semibold hover:bg-surface-50 hover:text-surface-900 transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <LayoutDashboard size={20} className="mr-2" strokeWidth={2} /> Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!isSubmitting) {
        return (
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-surface-200">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-surface-900 tracking-tight mb-2">My Post-Event Reports</h1>
                        <p className="font-medium text-[15px] text-surface-500">
                            Manage and view your club's submitted event reports.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsSubmitting(true)}
                        className="bg-umt-navy text-white px-6 py-3 rounded-lg font-semibold text-[15px] hover:bg-blue-900 transition-all duration-300 shadow-elevated hover:shadow-floating hover:-translate-y-0.5 active:translate-y-0 active:shadow-soft flex items-center group whitespace-nowrap"
                    >
                        <Plus size={18} strokeWidth={2.5} className="mr-2 group-hover:rotate-90 transition-transform duration-300" /> Submit New Report
                    </button>
                </div>

                {completedProposals.length === 0 ? (
                    <div className="bg-white p-12 border border-surface-200 rounded-xl shadow-soft text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-surface-50 text-surface-400 rounded-full flex items-center justify-center mb-4">
                            <FileText size={32} strokeWidth={1.5} />
                        </div>
                        <p className="font-display font-semibold text-lg text-surface-900">No reports submitted yet</p>
                        <p className="text-[15px] text-surface-500 mt-2">You haven't submitted any post-event reports. Click 'Submit New Report' to start.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {completedProposals.map(p => (
                            <div key={p.id} className="bg-white border border-surface-200 rounded-xl shadow-soft flex flex-col hover:shadow-floating hover:border-umt-accent/40 transition-all duration-500 ease-out-expo group transform hover:-translate-y-1 overflow-hidden">
                                <div className="p-5 md:p-6 border-b border-surface-100 bg-surface-50/50 group-hover:bg-umt-navy/5 transition-colors duration-300">
                                    <h3 className="font-display font-semibold text-lg text-surface-900 mb-1.5 line-clamp-1 group-hover:text-umt-navy transition-colors">{p.title}</h3>
                                    <p className="text-[12px] font-semibold text-surface-500 uppercase tracking-widest">{p.clubName}</p>
                                </div>
                                <div className="p-5 md:p-6 flex-1 space-y-4 bg-white">
                                    <div className="flex items-center text-[14px] font-medium text-surface-600">
                                        <div className="w-8 h-8 rounded-lg bg-surface-50 flex items-center justify-center mr-3 text-surface-400 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors">
                                            <Calendar size={16} strokeWidth={2} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] text-surface-400 uppercase tracking-wider font-semibold mb-0.5">Event Date</span>
                                            <span className="text-surface-900">{p.eventDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-[14px] font-medium text-surface-600">
                                        <div className="w-8 h-8 rounded-lg bg-surface-50 flex items-center justify-center mr-3 text-surface-400 group-hover:bg-umt-accent/10 group-hover:text-umt-accent transition-colors">
                                            <Users size={16} strokeWidth={2} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] text-surface-400 uppercase tracking-wider font-semibold mb-0.5">Participants</span>
                                            <span className="text-surface-900">{p.participants}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-[14px] font-medium text-surface-600">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50/50 flex items-center justify-center mr-3 text-emerald-500 group-hover:bg-emerald-100 transition-colors">
                                            <CheckCircle size={16} strokeWidth={2} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[11px] text-emerald-600/80 uppercase tracking-wider font-semibold mb-0.5">Submitted</span>
                                            <span className="text-surface-900">{p.postEventReport?.submittedDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 border-t border-surface-100 bg-surface-50 flex flex-col gap-3">
                                    <button
                                        onClick={() => alert(`Downloading ${p.postEventReport?.reportFile}...`)}
                                        className="w-full flex items-center justify-center gap-2 bg-umt-navy text-white px-4 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-blue-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                                    >
                                        <Download size={18} strokeWidth={2} /> Save Report
                                    </button>
                                    <button
                                        onClick={() => navigate(`/proposals/${p.id}`)}
                                        className="w-full flex items-center justify-center gap-2 bg-white text-surface-700 px-4 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-surface-50 hover:text-surface-900 transition-all duration-300 border border-surface-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
                                    >
                                        <FileText size={18} strokeWidth={2} /> View Original Proposal
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
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-surface-200">
                <h1 className="text-3xl font-display font-bold text-surface-900 tracking-tight">Submit Post-Event Report</h1>
                <button
                    onClick={() => setIsSubmitting(false)}
                    className="text-[14px] font-semibold text-surface-500 hover:text-surface-900 transition-colors"
                >
                    Cancel
                </button>
            </div>

            {eligibleProposals.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-soft text-center border border-surface-200">
                    <p className="text-[15px] font-medium text-surface-500">You have no approved events pending reports.</p>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-xl shadow-soft border border-surface-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[14px] font-semibold text-surface-700 mb-2">Select Event</label>
                            <select
                                className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-umt-navy/20 focus:border-umt-navy outline-none transition-all appearance-none cursor-pointer"
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
                            <label className="block text-[14px] font-semibold text-surface-700 mb-2">Upload Report (PDF)</label>
                            <div className="border-2 border-dashed border-surface-300 bg-surface-50/50 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-surface-100 hover:border-umt-navy/30 transition-all duration-300 cursor-pointer relative group">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-surface-200 mb-4 group-hover:scale-110 transition-transform duration-300 ease-out-expo">
                                    <UploadCloud className="text-umt-navy opacity-70 group-hover:opacity-100 transition-opacity" size={28} strokeWidth={1.5} />
                                </div>
                                <span className="text-[15px] font-semibold text-surface-700 mb-1">
                                    {file ? file.name : "Click to upload or drag and drop"}
                                </span>
                                <span className="text-[13px] text-surface-500">PDF, DOC, DOCX up to 10MB</span>
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
                             <label className="block text-[14px] font-semibold text-surface-700 mb-2">Event Photos (Optional)</label>
                             <div className="border border-surface-200 rounded-lg p-4 bg-surface-50 flex items-center text-surface-500 text-[14px]">
                                 <ImageIcon size={20} strokeWidth={1.5} className="mr-3 opacity-70" />
                                 <span className="font-medium">Supported formats: JPG, PNG. Max 5MB.</span>
                             </div>
                        </div>

                        <div className="pt-6 border-t border-surface-100">
                            <button
                                type="submit"
                                disabled={!selectedProposalId}
                                className="w-full bg-umt-navy text-white py-3.5 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-elevated hover:shadow-floating disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
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