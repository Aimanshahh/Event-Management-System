import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const showSidebar = user && ['admin', 'exhibitor', 'attendee'].includes(user.role);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="app-layout flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="main-container flex flex-1">
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <main className="content flex-1 p-6">{children}</main>
      </div>

      {/* Optional: mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Styles (optional, you can merge with index.css) */}
      <style>{`
        .main-container { display: flex; flex: 1; position: relative; }
        .content { flex: 1; padding: 2rem; }
      `}</style>
    </div>
  );
};

export default Layout;
