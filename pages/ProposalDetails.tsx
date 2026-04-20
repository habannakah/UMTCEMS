import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { StatusBadge } from '../components/StatusBadge';
import { ProposalStatus, UserRole } from '../types';
import { FileText, Calendar, MapPin, User, Download, Send, CheckCircle, XCircle, AlertTriangle, ShieldCheck, Tag, FileCheck, ImageIcon } from 'lucide-react';

const ProposalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { proposals, updateProposalStatus, addComment } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const proposal = proposals.find(p => p.id === id);

  const [comment, setComment] = useState('');
  const [showActionModal, setShowActionModal] = useState<null | 'approve' | 'reject' | 'amend'>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // HEPA Specific State
  const [hepaNote, setHepaNote] = useState('');
  const [hepaTag, setHepaTag] = useState('');

  if (!proposal) return <div className="p-8">Proposal not found</div>;

  if (user?.role === UserRole.MPP_EXCO) {
    if (proposal.status === ProposalStatus.PENDING_ADVISOR) {
      return (
        <div className="p-8 text-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="font-bold">This proposal is pending Club Advisor approval and is not yet available for MPP review.</p>
        </div>
      );
    }
    if (proposal.status === ProposalStatus.NEEDS_IMPROVEMENT && !proposal.history.some(h => h.status === ProposalStatus.PENDING_MPP)) {
      return (
        <div className="p-8 text-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="font-bold">This proposal was returned for revisions by the Club Advisor and has not yet reached MPP review.</p>
        </div>
      );
    }
  }

  const canReview = user && (
      (user.role === UserRole.ADVISOR && proposal.status === ProposalStatus.PENDING_ADVISOR) ||
      (user.role === UserRole.MPP_EXCO && proposal.status === ProposalStatus.PENDING_MPP)
  );

  const canEdit = user && user.role === UserRole.CLUB_REP && proposal.status === ProposalStatus.NEEDS_IMPROVEMENT;
  const isHepa = user?.role === UserRole.HEPA_STAFF;

  const handleAction = (status: ProposalStatus) => {
      if (!user) return;
      
      // If amendment or reject, require comment
      if ((status === ProposalStatus.NEEDS_IMPROVEMENT || status === ProposalStatus.REJECTED) && !comment) {
          alert("Please provide a reason in the comment box.");
          return;
      }

      // Logic for approvals
      let nextStatus = status;
      if (status === ProposalStatus.APPROVED && user.role === UserRole.ADVISOR) {
          nextStatus = ProposalStatus.PENDING_MPP; // Advisor approval moves to MPP
      }

      updateProposalStatus(proposal.id, nextStatus, user.name, comment);
      setShowActionModal(null);
      setComment('');

      // Set confirmation message
      let msg = '';
      if (status === ProposalStatus.APPROVED) msg = 'Proposal successfully approved.';
      else if (status === ProposalStatus.REJECTED) msg = 'Proposal has been rejected.';
      else if (status === ProposalStatus.NEEDS_IMPROVEMENT) msg = 'Amendment request sent to club representative.';
      
      setSuccessMessage(msg);
      window.scrollTo(0, 0);

      // Hide message after 4 seconds
      setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleHepaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!user || !hepaNote.trim()) return;

      addComment(proposal.id, {
          authorName: user.name,
          authorRole: UserRole.HEPA_STAFF,
          content: hepaNote,
          type: 'compliance_note',
          tag: hepaTag.trim() || undefined
      });
      setHepaNote('');
      setHepaTag('');
      setSuccessMessage('Compliance note added successfully.');
      setTimeout(() => setSuccessMessage(''), 3000);
  };

  const ActionModal = () => {
      if (!showActionModal) return null;
      let title = '';
      let actionStatus = ProposalStatus.PENDING_ADVISOR;
      let buttonColor = '';

      switch(showActionModal) {
          case 'approve': 
              title = 'Approve Proposal'; 
              actionStatus = ProposalStatus.APPROVED; 
              buttonColor = 'bg-green-600 hover:bg-green-700';
              break;
          case 'reject': 
              title = 'Reject Proposal'; 
              actionStatus = ProposalStatus.REJECTED; 
              buttonColor = 'bg-red-600 hover:bg-red-700';
              break;
          case 'amend': 
              title = 'Request Amendments'; 
              actionStatus = ProposalStatus.NEEDS_IMPROVEMENT; 
              buttonColor = 'bg-amber-500 hover:bg-amber-600';
              break;
      }

      return (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl transform transition-all">
                  <h3 className="text-xl font-bold mb-4">{title}</h3>
                  <p className="text-slate-600 mb-4">
                      {showActionModal === 'approve' 
                        ? 'Are you sure you want to approve this proposal? It will proceed to the next stage.' 
                        : 'Please provide comments below for the club representative.'}
                  </p>
                  
                  <textarea
                      className="w-full border border-slate-300 rounded-lg p-3 mb-4 h-32 outline-none focus:ring-2 focus:ring-umt-light resize-none"
                      placeholder="Enter your comments here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                  />

                  <div className="flex justify-end space-x-3">
                      <button onClick={() => setShowActionModal(null)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">Cancel</button>
                      <button onClick={() => handleAction(actionStatus)} className={`px-4 py-2 text-white rounded-lg transition shadow-md ${buttonColor}`}>Confirm</button>
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <ActionModal />

      {/* Success Notification */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl flex items-center shadow-sm animate-[fadeIn_0.5s_ease-out]">
          <CheckCircle size={24} className="mr-3 text-green-600" />
          <div className="font-medium text-lg">{successMessage}</div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <div className="flex items-center space-x-3 mb-2">
               <h1 className="text-2xl font-bold text-slate-800">{proposal.title}</h1>
               <StatusBadge status={proposal.status} />
           </div>
           <div className="flex flex-wrap gap-4 text-sm text-slate-500">
               <span className="flex items-center"><User size={16} className="mr-1"/> {proposal.submitterName} ({proposal.clubName})</span>
               <span className="flex items-center"><Calendar size={16} className="mr-1"/> Submitted: {proposal.dateSubmitted}</span>
           </div>
        </div>
        
        {canReview && (
            <div className="flex space-x-2">
                <button onClick={() => setShowActionModal('reject')} className="flex items-center px-4 py-2 border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition font-medium">
                    <XCircle size={18} className="mr-2"/> Reject
                </button>
                <button onClick={() => setShowActionModal('amend')} className="flex items-center px-4 py-2 border border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition font-medium">
                    <AlertTriangle size={18} className="mr-2"/> Request Changes
                </button>
                <button onClick={() => setShowActionModal('approve')} className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition font-medium shadow-sm">
                    <CheckCircle size={18} className="mr-2"/> Approve
                </button>
            </div>
        )}
        
        {canEdit && (
            <button 
                onClick={() => navigate(`/proposals/${proposal.id}/edit`)}
                className="flex items-center px-4 py-2 bg-umt-navy text-white hover:bg-blue-900 rounded-lg transition font-medium shadow-sm"
            >
                Edit & Resubmit
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Details */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Event Details</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase">Event Date</label>
                        <p className="font-medium text-slate-800 flex items-center mt-1"><Calendar size={18} className="mr-2 text-umt-light"/> {proposal.eventDate}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase">Venue</label>
                        <p className="font-medium text-slate-800 flex items-center mt-1"><MapPin size={18} className="mr-2 text-umt-light"/> {proposal.venue}</p>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-400 uppercase">Participants</label>
                        <p className="text-slate-700 mt-1">{proposal.participants}</p>
                    </div>
                     <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase">Objective</label>
                        <p className="text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">{proposal.objective}</p>
                    </div>
                    <div className="col-span-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase">Description</label>
                        <p className="text-slate-700 mt-1 whitespace-pre-wrap">{proposal.description}</p>
                    </div>
                    {proposal.budget && (
                        <div className="col-span-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase">Budget / Financial Requirements</label>
                            <p className="text-slate-700 mt-1 whitespace-pre-wrap">{proposal.budget}</p>
                        </div>
                    )}
                    {proposal.committee && (
                        <div className="col-span-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase">Committee Members / Organizers</label>
                            <p className="text-slate-700 mt-1 whitespace-pre-wrap">{proposal.committee}</p>
                        </div>
                    )}
                    {proposal.logistics && (
                        <div className="col-span-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase">Equipment / Logistics Needed</label>
                            <p className="text-slate-700 mt-1 whitespace-pre-wrap">{proposal.logistics}</p>
                        </div>
                    )}
                    {proposal.outcomes && (
                        <div className="col-span-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase">Expected Outcomes</label>
                            <p className="text-slate-700 mt-1 whitespace-pre-wrap">{proposal.outcomes}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Documents</h3>
                <div className="space-y-3">
                    {proposal.documents?.length ? (
                        proposal.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-red-100 p-2 rounded text-red-600">
                                        <FileText size={20} />
                                    </div>
                                    <span className="font-medium text-slate-700">{doc.name}</span>
                                </div>
                                <a
                                    href={doc.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-400 hover:text-umt-light"
                                    aria-label={`Open ${doc.name}`}
                                >
                                    <Download size={20} />
                                </a>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                            No supporting documents have been attached to this proposal yet.
                        </div>
                    )}
                    
                    {/* Post-Event Report Display */}
                    {proposal.postEventReport && (
                        <div className="mt-6 pt-4 border-t border-slate-100">
                             <h4 className="font-bold text-slate-800 mb-3 flex items-center">
                                 <FileCheck className="mr-2 text-green-600" size={20}/> Post-Event Report (Completed)
                             </h4>
                             <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-100 p-2 rounded text-green-600">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <span className="font-medium text-slate-800 block">{proposal.postEventReport.reportFile}</span>
                                        <span className="text-xs text-slate-500">Submitted on: {proposal.postEventReport.submittedDate}</span>
                                    </div>
                                </div>
                                <button className="text-green-700 hover:text-green-900 font-medium text-sm flex items-center">
                                    <Download size={16} className="mr-1"/> Save report
                                </button>
                            </div>
                            {proposal.postEventReport.photos.length > 0 && (
                                <div className="mt-3 flex gap-2">
                                    {proposal.postEventReport.photos.map((photo, i) => (
                                        <div key={i} className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                                            <ImageIcon size={20} className="text-slate-400"/>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* HEPA Monitoring Section (Only for HEPA Staff) */}
            {isHepa && (
                <div className="bg-white rounded-xl shadow-sm border border-indigo-200 p-6 ring-1 ring-indigo-50">
                    <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
                        <ShieldCheck className="mr-2"/> HEPA Compliance & Monitoring
                    </h3>
                    <form onSubmit={handleHepaSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Compliance Note / Feedback</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter monitoring notes or compliance feedback..."
                                value={hepaNote}
                                onChange={(e) => setHepaNote(e.target.value)}
                            />
                        </div>
                        <div>
                             <label className="block text-sm font-medium text-slate-700 mb-1">Tag / Reference (Optional)</label>
                             <div className="relative">
                                 <Tag size={16} className="absolute left-3 top-2.5 text-slate-400" />
                                 <input
                                    type="text"
                                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. Rule 4.1, Case #123"
                                    value={hepaTag}
                                    onChange={(e) => setHepaTag(e.target.value)}
                                 />
                             </div>
                        </div>
                        <div className="flex justify-end">
                             <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm flex items-center">
                                 <Send size={16} className="mr-2" /> Add Note
                             </button>
                        </div>
                    </form>
                </div>
            )}

             {/* Comments Section */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Discussion & Feedback</h3>
                <div className="space-y-6">
                    {proposal.comments.length === 0 ? (
                        <p className="text-slate-400 text-sm italic">No comments yet.</p>
                    ) : (
                        proposal.comments.map(c => (
                            <div 
                                key={c.id} 
                                className={`flex space-x-4 p-4 rounded-lg border ${
                                    c.type === 'amendment_request' ? 'bg-amber-50 border-amber-100' : 
                                    c.type === 'compliance_note' ? 'bg-indigo-50 border-indigo-100' :
                                    c.type === 'rejection_reason' ? 'bg-red-50 border-red-100' :
                                    'bg-white border-transparent'
                                }`}
                            >
                                <div className="flex-shrink-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                                        c.type === 'compliance_note' ? 'bg-indigo-200 text-indigo-700' : 'bg-slate-200 text-slate-600'
                                    }`}>
                                        {c.type === 'compliance_note' ? <ShieldCheck size={14}/> : c.authorName.charAt(0)}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-semibold text-sm text-slate-800">
                                            {c.authorName} 
                                            <span className="text-xs font-normal text-slate-500 ml-1">({c.authorRole})</span>
                                        </span>
                                        <span className="text-xs text-slate-400">{c.timestamp}</span>
                                    </div>
                                    <p className="text-slate-700 text-sm whitespace-pre-wrap">{c.content}</p>
                                    
                                    {/* Tag Display for HEPA Notes */}
                                    {c.tag && (
                                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-xs font-medium">
                                            <Tag size={12} className="mr-1" />
                                            {c.tag}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
             </div>
         </div>

         {/* Sidebar - Timeline */}
         <div className="space-y-6">
             <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Status Timeline</h3>
                <div className="relative border-l-2 border-slate-200 ml-3 space-y-6 pl-6 pb-2">
                    {proposal.history.map((h, idx) => {
                        let label = h.status.replace('_', ' ');
                        if (h.status === ProposalStatus.PENDING_ADVISOR && idx === 0) label = "Submitted for Advisor Review";
                        else if (h.status === ProposalStatus.PENDING_ADVISOR) label = "Resubmitted for Advisor Review";
                        else if (h.status === ProposalStatus.PENDING_MPP) label = "Approved by Advisor (Pending MPP)";
                        else if (h.status === ProposalStatus.NEEDS_IMPROVEMENT) label = "Revisions Requested";
                        else if (h.status === ProposalStatus.APPROVED) label = "Approved by MPP";
                        else if (h.status === ProposalStatus.REJECTED) label = "Proposal Rejected";
                        else if (h.status === ProposalStatus.COMPLETED) label = "Post-Event Report Submitted";

                        return (
                            <div key={idx} className="relative">
                                <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 ${idx === proposal.history.length - 1 ? 'bg-umt-light border-umt-light' : 'bg-white border-slate-300'}`}></div>
                                <p className="text-sm font-semibold text-slate-800">{label}</p>
                                <p className="text-xs text-slate-500">by {h.actor}</p>
                                <p className="text-xs text-slate-400 mt-1">{h.timestamp}</p>
                            </div>
                        );
                    })}
                    
                    {/* Future Steps Visual */}
                    {(() => {
                        let futureSteps: string[] = [];
                        if (proposal.status === ProposalStatus.PENDING_ADVISOR) {
                            futureSteps = ["Advisor Approval", "MPP Approval", "Post-Event Report"];
                        } else if (proposal.status === ProposalStatus.PENDING_MPP) {
                            futureSteps = ["MPP Approval", "Post-Event Report"];
                        } else if (proposal.status === ProposalStatus.NEEDS_IMPROVEMENT) {
                            futureSteps = ["Resubmission", "Pending Approvals", "Post-Event Report"];
                        } else if (proposal.status === ProposalStatus.APPROVED) {
                            futureSteps = ["Post-Event Report"];
                        }

                        return futureSteps.map((step, idx) => (
                            <div key={`future-${idx}`} className="relative opacity-40">
                                <div className="absolute -left-[31px] w-4 h-4 rounded-full border-2 bg-white border-slate-300"></div>
                                <p className="text-sm font-semibold text-slate-600">{step}</p>
                            </div>
                        ));
                    })()}
                </div>
             </div>
             
             {/* If approved, show Post Event Report button logic */}
             {proposal.status === ProposalStatus.APPROVED && user?.role === UserRole.CLUB_REP && (
                 <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                     <h4 className="font-bold text-blue-900 mb-2">Event Completed?</h4>
                     <p className="text-sm text-blue-800 mb-4">Don't forget to submit your post-event report to complete the process.</p>
                     <button 
                        onClick={() => navigate('/reports')}
                        className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                     >
                         Upload Report
                     </button>
                 </div>
             )}
         </div>
      </div>
    </div>
  );
};

export default ProposalDetails;
