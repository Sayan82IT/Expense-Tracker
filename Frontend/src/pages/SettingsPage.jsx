// import React, { useState, useContext } from 'react';
// import { User, Mail, Lock, ShieldCheck, Save, KeyRound } from 'lucide-react';
// import Sidebar from '../components/Sidebar';
// import { AuthContext } from '../context/AuthContext';
// import { updateProfile, updatePassword } from '../services/api';

// const SettingsPage = () => {
//   const { user, updateUser } = useContext(AuthContext);

//   const [profileData, setProfileData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//   });
//   const [profileError, setProfileError] = useState('');
//   const [profileSuccess, setProfileSuccess] = useState('');
//   const [profileLoading, setProfileLoading] = useState(false);

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });
//   const [passwordError, setPasswordError] = useState('');
//   const [passwordSuccess, setPasswordSuccess] = useState('');
//   const [passwordLoading, setPasswordLoading] = useState(false);

//   const inputClass =
//     'w-full bg-[#0b0f19] border border-slate-800 text-white placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-emerald-500';

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setProfileError('');
//     setProfileSuccess('');

//     if (!profileData.name || !profileData.email) {
//       setProfileError('Please fill in all fields');
//       return;
//     }

//     setProfileLoading(true);
//     try {
//       const { data } = await updateProfile(profileData);
//       updateUser(data.user);
//       setProfileSuccess('Profile updated successfully');
//     } catch (err) {
//       setProfileError(err.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setPasswordError('');
//     setPasswordSuccess('');

//     if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
//       setPasswordError('Please fill in all fields');
//       return;
//     }
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       setPasswordError('New passwords do not match');
//       return;
//     }
//     if (passwordData.newPassword.length < 8) {
//       setPasswordError('New password must be at least 8 characters long');
//       return;
//     }

//     setPasswordLoading(true);
//     try {
//       await updatePassword({
//         currentPassword: passwordData.currentPassword,
//         newPassword: passwordData.newPassword,
//       });
//       setPasswordSuccess('Password updated successfully');
//       setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
//     } catch (err) {
//       setPasswordError(err.response?.data?.message || 'Failed to update password');
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0a0e17] text-slate-100 flex flex-col md:flex-row font-sans">
//       <Sidebar />

//       <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto max-w-3xl">
//         <div>
//           <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
//           <p className="text-sm text-slate-400 mt-0.5">Manage your account profile and security</p>
//         </div>

//         {/* Profile card */}
//         <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
//               <User size={18} />
//             </div>
//             <div>
//               <h3 className="text-base font-bold text-white">Profile Information</h3>
//               <p className="text-xs text-slate-500">Update your name and email address</p>
//             </div>
//           </div>

//           {profileError && (
//             <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
//               {profileError}
//             </div>
//           )}
//           {profileSuccess && (
//             <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-sm rounded-lg px-3 py-2 mb-4">
//               {profileSuccess}
//             </div>
//           )}

//           <form onSubmit={handleProfileSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm text-slate-300 mb-1">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                 <input
//                   type="text"
//                   value={profileData.name}
//                   onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm text-slate-300 mb-1">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                 <input
//                   type="email"
//                   value={profileData.email}
//                   onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={profileLoading}
//               className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 transition"
//             >
//               <Save size={16} />
//               {profileLoading ? 'Saving...' : 'Save Changes'}
//             </button>
//           </form>
//         </div>

//         {/* Password card */}
//         <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-6">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
//               <KeyRound size={18} />
//             </div>
//             <div>
//               <h3 className="text-base font-bold text-white">Change Password</h3>
//               <p className="text-xs text-slate-500">Choose a strong password you don't use elsewhere</p>
//             </div>
//           </div>

//           {passwordError && (
//             <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
//               {passwordError}
//             </div>
//           )}
//           {passwordSuccess && (
//             <div className="bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-sm rounded-lg px-3 py-2 mb-4">
//               {passwordSuccess}
//             </div>
//           )}

//           <form onSubmit={handlePasswordSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm text-slate-300 mb-1">Current Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                 <input
//                   type="password"
//                   value={passwordData.currentPassword}
//                   onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
//                   placeholder="••••••••"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm text-slate-300 mb-1">New Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                 <input
//                   type="password"
//                   value={passwordData.newPassword}
//                   onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
//                   placeholder="••••••••"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm text-slate-300 mb-1">Confirm New Password</label>
//               <div className="relative">
//                 <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//                 <input
//                   type="password"
//                   value={passwordData.confirmPassword}
//                   onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
//                   placeholder="••••••••"
//                   className={inputClass}
//                 />
//               </div>
//             </div>
//             <button
//               type="submit"
//               disabled={passwordLoading}
//               className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 transition"
//             >
//               <Save size={16} />
//               {passwordLoading ? 'Updating...' : 'Update Password'}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SettingsPage;


import React, { useState, useContext } from 'react';
import { User, Mail, Lock, ShieldCheck, Save, KeyRound } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';
import { updateProfile, updatePassword } from '../services/api';

const SettingsPage = () => {
  const { user, updateUser } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const inputClass =
    'w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-lg pl-10 pr-3 py-2.5 focus:outline-none focus:border-emerald-500';

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    if (!profileData.name || !profileData.email) {
      setProfileError('Please fill in all fields');
      return;
    }

    setProfileLoading(true);
    try {
      const { data } = await updateProfile(profileData);
      updateUser(data.user);
      setProfileSuccess('Profile updated successfully');
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    setPasswordLoading(true);
    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e17] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 space-y-6 overflow-y-auto max-w-3xl">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Settings</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage your account profile and security</p>
        </div>

        {/* Profile card */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <User size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Profile Information</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Update your name and email address</p>
            </div>
          </div>

          {profileError && (
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
              {profileError}
            </div>
          )}
          {profileSuccess && (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg px-3 py-2 mb-4">
              {profileSuccess}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={profileLoading}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 transition"
            >
              <Save size={16} />
              {profileLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Password card */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
              <KeyRound size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Change Password</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">Choose a strong password you don't use elsewhere</p>
            </div>
          </div>

          {passwordError && (
            <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-lg px-3 py-2 mb-4">
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm rounded-lg px-3 py-2 mb-4">
              {passwordSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-600 dark:text-slate-300 mb-1">Confirm New Password</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold rounded-lg px-5 py-2.5 transition"
            >
              <Save size={16} />
              {passwordLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;