import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from '../services/api';
import { User, Calendar, Clock, MapPin, Lock, ShieldAlert, Key } from 'lucide-react';

const ProfileSettings = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();

  const [profileData, setProfileData] = useState({
    name: '',
    dob: '',
    tob: '',
    pob: '',
    gender: 'Male',
    profileImage: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Avatars options list
  const avatars = [
    'https://api.dicebear.com/7.x/bottts/svg?seed=Aries',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Leo',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Scorpio',
    'https://api.dicebear.com/7.x/bottts/svg?seed=Jupiter'
  ];

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        dob: user.birthDetails?.dob || '',
        tob: user.birthDetails?.tob || '',
        pob: user.birthDetails?.pob || '',
        gender: user.birthDetails?.gender || 'Male',
        profileImage: user.profileImage || ''
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);

    const result = await updateProfile({
      name: profileData.name,
      profileImage: profileData.profileImage,
      birthDetails: {
        dob: profileData.dob,
        tob: profileData.tob,
        pob: profileData.pob,
        gender: profileData.gender
      }
    });

    setUpdatingProfile(false);
    if (result.success) {
      addToast('Profile updated successfully!', 'success');
    } else {
      addToast(result.message, 'error');
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }

    setUpdatingPassword(true);
    try {
      await API.put('/auth/change-password', {
        currentPassword,
        newPassword
      });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      addToast('Password successfully changed!', 'success');
    } catch (error) {
      addToast(error.response?.data?.message || 'Failed to update password.', 'error');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      
      {/* Left Columns: Profile details and avatar */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass p-6 md:p-8 rounded-3xl border border-slate-800/40 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Profile Settings</h3>
            <p className="text-slate-400 text-xs mt-0.5">Manage your details and birth coordinates</p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            
            {/* Avatar Select list */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Select Avatar Image</label>
              <div className="flex gap-4">
                {avatars.map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setProfileData({ ...profileData, profileImage: img })}
                    className={`w-12 h-12 rounded-xl overflow-hidden border p-1 bg-slate-900/60 ${
                      profileData.profileImage === img
                        ? 'border-indigo-500 shadow-md shadow-indigo-500/10'
                        : 'border-slate-800/40'
                    }`}
                  >
                    <img src={img} alt="Avatar" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Profile parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Gender</label>
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Coordinates */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block border-b border-indigo-500/15 pb-1.5 mb-4">
                Birth Coordinates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Date of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Time of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <Clock className="w-4 h-4" />
                  </span>
                  <input
                    type="time"
                    name="tob"
                    value={profileData.tob}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-350 uppercase">Place of Birth</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    name="pob"
                    value={profileData.pob}
                    onChange={handleProfileChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-200 outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={updatingProfile}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs transition-colors"
            >
              {updatingProfile ? 'Saving profile...' : 'Save Profile Changes'}
            </button>

          </form>
        </div>
      </div>

      {/* Right Column: Password Change card */}
      <div className="space-y-6">
        <div className="glass p-6 rounded-3xl border border-slate-800/40 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              <Key className="w-5 h-5 text-indigo-400" />
              Change Password
            </h3>
            <p className="text-slate-500 text-[10px] mt-0.5">Revise your security credentials</p>
          </div>

          <form onSubmit={handleSavePassword} className="space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-350 uppercase">Current Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-250 outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-350 uppercase">New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-250 outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-350 uppercase">Confirm New Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/30 text-sm text-slate-250 outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updatingPassword}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-750 disabled:opacity-50 text-indigo-400 hover:text-indigo-300 border border-slate-700 hover:border-slate-650 font-bold text-xs transition-colors"
            >
              {updatingPassword ? 'Updating...' : 'Change Password'}
            </button>

          </form>
        </div>
      </div>

    </div>
  );
};

export default ProfileSettings;
