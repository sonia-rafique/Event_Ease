import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button from '../common/Button';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-[#1c3f8e] to-[#06b3d3] text-white p-4 shadow-lg-soft sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold text-white tracking-tighter">
          EventEase
        </Link>        
        <div className="space-x-4 flex items-center">
          <Link to="/" className="text-white hover:text-white/80 font-medium transition duration-150 hidden sm:inline">Home</Link>

          {user ? (
            <>
              {user.role === 'club' && (
                <Link to="/club/manage-events" className="text-white hover:text-white/80 font-medium">
                  Club Panel
                </Link>
              )}

              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="text-white hover:text-white/80 font-medium">
                  Admin Panel
                </Link>
              )}

              <Button onClick={handleLogout} variant="danger">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-white/80 font-medium">Login</Link>
              <Link to="/register">
                <Button className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-3">
                  Join Now
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;