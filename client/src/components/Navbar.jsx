import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from '../contexts/SearchContext';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { searchQuery, updateSearch } = useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
<div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 shadow-lg">

      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-white/30 transition-all duration-200">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Management Pro</h1>
          <p className="text-xs text-blue-100">Business Dashboard</p>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 relative">
        <input
          type="text"
          placeholder="Search products, sales..."
          value={searchQuery}
          onChange={(e) => updateSearch(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded-full border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-75"
        />
        {searchQuery && (
          <button
            onClick={() => updateSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center space-x-4">

        {/* Profile */}
        <div className="flex items-center space-x-2 cursor-pointer group">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
          <span className="font-medium text-white">{user?.username || 'User'}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-white hover:text-red-200 transition-colors opacity-0 group-hover:opacity-100"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}