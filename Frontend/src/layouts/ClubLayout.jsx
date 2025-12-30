import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`flex items-center space-x-3 p-3 rounded-lg transition duration-150 font-semibold ${isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}>
        {children}
      </Link>
    );
};

const ClubLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between shadow-2xl sticky top-0 h-screen">
        <div>
          <h2 className="text-3xl font-extrabold mb-12 text-emerald-500 tracking-tighter">Club<span className="text-white">Panel</span></h2>
          
          <nav className="flex flex-col space-y-3">
            <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg transition duration-150 font-semibold text-emerald-400 hover:text-white hover:bg-emerald-900/30 border border-emerald-900/50 mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Back to Home</span>
            </Link>

            <NavLink to="/club/manage-events">
                <span>Manage Events</span>
            </NavLink>
            <NavLink to="/club/create-event">
                <span>Create New Event</span>
            </NavLink>
          </nav>
        </div>

        <button 
          onClick={() => { logout(); navigate('/login'); }} 
          className="flex items-center space-x-3 text-red-400 p-3 hover:bg-red-900/20 rounded-lg font-semibold transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ClubLayout;