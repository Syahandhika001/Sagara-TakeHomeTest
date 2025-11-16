import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, {user?.name || 'User'}!</p>
        </div>

        {/* Right Side: User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {/* Avatar */}
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            
            {/* User Info */}
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
            </div>

            {/* Dropdown Icon */}
            <svg 
              className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Navigate to profile (coming soon)
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <span>👤</span>
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => {
                  setShowDropdown(false);
                  // Navigate to settings (coming soon)
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <span>⚙️</span>
                <span>Settings</span>
              </button>

              <hr className="my-2 border-gray-200" />

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}