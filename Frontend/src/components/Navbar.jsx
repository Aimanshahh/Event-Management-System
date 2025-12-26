import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar flex justify-between items-center px-4 h-14 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        {/* Hamburger for mobile */}
        {user && (
          <button
            className="btn btn-secondary md:hidden"
            onClick={onMenuClick}
          >
            ☰
          </button>
        )}
        <div className="navbar-brand text-lg font-bold">
          <Link to="/">ExpoHub</Link>
        </div>
      </div>

      {/* Desktop menu */}
      <div className="navbar-menu hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/" className={`nav-link ${isActive('/') ? 'font-bold' : ''}`}>Home</Link>
            <Link to="/expos" className={`nav-link ${isActive('/expos') ? 'font-bold' : ''}`}>Expos</Link>
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <>
                <Link to="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard') ? 'font-bold' : ''}`}>Dashboard</Link>
                <Link to="/admin/users" className={`nav-link ${isActive('/admin/users') ? 'font-bold' : ''}`}>Users</Link>
                <Link to="/admin/expos" className={`nav-link ${isActive('/admin/expos') ? 'font-bold' : ''}`}>Expos</Link>
              </>
            )}
            {user.role === 'exhibitor' && (
              <>
                <Link to="/exhibitor/dashboard" className={`nav-link ${isActive('/exhibitor/dashboard') ? 'font-bold' : ''}`}>Dashboard</Link>
                <Link to="/exhibitor/my-expos" className={`nav-link ${isActive('/exhibitor/my-expos') ? 'font-bold' : ''}`}>My Expos</Link>
                <Link to="/exhibitor/register" className={`nav-link ${isActive('/exhibitor/register') ? 'font-bold' : ''}`}>Register</Link>
              </>
            )}
            {user.role === 'attendee' && (
              <>
                <Link to="/attendee/dashboard" className={`nav-link ${isActive('/attendee/dashboard') ? 'font-bold' : ''}`}>Dashboard</Link>
                <Link to="/attendee/events" className={`nav-link ${isActive('/attendee/events') ? 'font-bold' : ''}`}>Events</Link>
                <Link to="/attendee/registrations" className={`nav-link ${isActive('/attendee/registrations') ? 'font-bold' : ''}`}>My Registrations</Link>
              </>
            )}
            <span className="nav-user ml-4">Welcome, {user.name}</span>
            <button onClick={handleLogout} className="btn btn-sm btn-secondary ml-2">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
