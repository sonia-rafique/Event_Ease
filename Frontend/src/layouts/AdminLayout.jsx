import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
      <Link 
        to={to} 
        className={`flex items-center space-x-3 p-3 rounded-lg transition duration-150 font-semibold ${
            isActive 
            ? 'bg-primary text-white shadow-md' 
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        {children}
      </Link>
    );
};

const AdminLayout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-dark text-white p-6 flex flex-col justify-between shadow-2xl sticky top-0 h-screen">
        <div>
          <h2 className="text-3xl font-extrabold mb-12 text-primary tracking-tighter">Admin<span className="text-secondary">Ease</span></h2>
          <nav className="flex flex-col space-y-3">
            <NavLink to="/admin/dashboard">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v8a2 2 0 002 2z"></path></svg>
                <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/manage-clubs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-1a1 1 0 01-1-1V9.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75V19a1 1 0 01-1 1zM9 20H8a1 1 0 01-1-1V4.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75V19a1 1 0 01-1 1zM3 20H2a1 1 0 01-1-1V14.75a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75V19a1 1 0 01-1 1z"></path></svg>
                <span>Manage Clubs</span>
            </NavLink>
            <NavLink to="/admin/manage-events">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                <span>Manage Events</span>
            </NavLink>
            <NavLink to="/">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                <span>View Public Site</span>
            </NavLink>
          </nav>
        </div>
        <button 
          onClick={() => { logout(); navigate('/login'); }} 
          className="flex items-center space-x-3 text-left text-red-400 hover:text-red-300 transition duration-150 p-3 rounded-lg mt-10 hover:bg-gray-700 font-semibold"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          <span>Logout</span>
        </button>
      </aside>
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminLayout;