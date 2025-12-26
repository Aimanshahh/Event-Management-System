import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return null;

  const menus = {
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/admin/users', label: 'Users', icon: '👥' },
      { path: '/admin/expos', label: 'Expos', icon: '🎪' },
      { path: '/admin/exhibitors', label: 'Exhibitors', icon: '🏢' }
    ],
    exhibitor: [
      { path: '/exhibitor/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/exhibitor/my-expos', label: 'My Expos', icon: '🎪' },
      { path: '/exhibitor/register', label: 'Register Expo', icon: '➕' },
      { path: '/exhibitor/booths', label: 'My Booths', icon: '🏪' }
    ],
    attendee: [
      { path: '/attendee/dashboard', label: 'Dashboard', icon: '📊' },
      { path: '/attendee/events', label: 'Browse Events', icon: '🎪' },
      { path: '/attendee/registrations', label: 'My Registrations', icon: '📝' },
      { path: '/attendee/bookmarks', label: 'Bookmarks', icon: '🔖' }
    ]
  };

  const menu = menus[user.role] || [];
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`sidebar fixed top-0 left-0 h-full z-50 bg-gray-800 w-64 transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="sidebar-header flex justify-between items-center px-4 py-4 border-b border-gray-700">
        <h3 className="text-white font-bold">{user.role.toUpperCase()}</h3>
        {onClose && (
          <button onClick={onClose} className="btn btn-sm btn-secondary md:hidden">
            ✖
          </button>
        )}
      </div>

      <nav className="sidebar-nav flex flex-col mt-4">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link flex items-center gap-2 px-4 py-2 rounded transition-colors duration-200 ${
              isActive(item.path)
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={onClose}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
