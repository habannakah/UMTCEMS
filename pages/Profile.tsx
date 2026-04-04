import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Shield, Building, Save, Lock, Bell } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  
  // Local state for editable fields
  const [name, setName] = useState(user?.name || '');
  const [isEditing, setIsEditing] = useState(false);
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification state
  const [emailNotif, setEmailNotif] = useState(true);
  const [browserNotif, setBrowserNotif] = useState(false);

  // Success/Error messages
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  if (!user) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name });
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully.' });
    setTimeout(() => setMessage(null), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    // Simulate API call
    setMessage({ type: 'success', text: 'Password changed successfully.' });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
       {/* Header */}
       <div>
         <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
         <p className="text-slate-500">Manage your profile information and preferences.</p>
       </div>

       {message && (
         <div className={`p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
           {message.text}
         </div>
       )}

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Profile Card */}
          <div className="md:col-span-1 space-y-6">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-3xl font-bold mx-auto mb-4">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-lg font-bold text-slate-800">{user.name}</h2>
                <p className="text-slate-500 text-sm mb-4">{user.email}</p>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                  {user.role.replace('_', ' ')}
                </div>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center">
                  <Bell size={18} className="mr-2 text-slate-400" /> Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Email Notifications</span>
                    <button 
                      onClick={() => setEmailNotif(!emailNotif)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${emailNotif ? 'bg-umt-light' : 'bg-slate-300'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${emailNotif ? 'left-5' : 'left-1'}`}></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Browser Alerts</span>
                    <button 
                      onClick={() => setBrowserNotif(!browserNotif)}
                      className={`w-10 h-6 rounded-full transition-colors relative ${browserNotif ? 'bg-umt-light' : 'bg-slate-300'}`}
                    >
                       <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${browserNotif ? 'left-5' : 'left-1'}`}></div>
                    </button>
                  </div>
                </div>
             </div>
          </div>

          {/* Right Column: Edit Forms */}
          <div className="md:col-span-2 space-y-6">
             {/* General Info */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-lg font-bold text-slate-800">General Information</h3>
                   {!isEditing && (
                     <button onClick={() => setIsEditing(true)} className="text-umt-light text-sm font-medium hover:underline">
                       Edit Details
                     </button>
                   )}
                </div>
                
                <form onSubmit={handleSaveProfile} className="space-y-4">
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                           <User size={18} className="absolute left-3 top-2.5 text-slate-400" />
                           <input 
                             type="text" 
                             value={name} 
                             onChange={(e) => setName(e.target.value)}
                             disabled={!isEditing}
                             className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none disabled:bg-slate-50 disabled:text-slate-500"
                           />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                         <div className="relative">
                           <Mail size={18} className="absolute left-3 top-2.5 text-slate-400" />
                           <input 
                             type="email" 
                             value={user.email} 
                             disabled
                             className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                           />
                        </div>
                      </div>
                      
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                         <div className="relative">
                           <Shield size={18} className="absolute left-3 top-2.5 text-slate-400" />
                           <input 
                             type="text" 
                             value={user.role} 
                             disabled
                             className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                           />
                        </div>
                      </div>

                      {user.clubName && (
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Club</label>
                           <div className="relative">
                             <Building size={18} className="absolute left-3 top-2.5 text-slate-400" />
                             <input 
                               type="text" 
                               value={user.clubName} 
                               disabled
                               className="w-full pl-10 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed"
                             />
                          </div>
                        </div>
                      )}
                   </div>

                   {isEditing && (
                     <div className="flex justify-end space-x-3 pt-2">
                        <button type="button" onClick={() => { setIsEditing(false); setName(user.name); }} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-umt-navy text-white rounded-lg flex items-center hover:bg-blue-900"><Save size={18} className="mr-2"/> Save Changes</button>
                     </div>
                   )}
                </form>
             </div>

             {/* Security */}
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Security</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                      />
                   </div>
                   <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-umt-light outline-none"
                        />
                      </div>
                   </div>
                   <div className="pt-2">
                      <button type="submit" className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg flex items-center hover:bg-slate-50 transition">
                         <Lock size={18} className="mr-2" /> Change Password
                      </button>
                   </div>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Profile;