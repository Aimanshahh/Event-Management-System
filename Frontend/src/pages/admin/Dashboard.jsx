import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, expos: 0, exhibitors: 0, attendees: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAnalytics();
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">Users: {stats.users}</div>
        <div className="stat-card">Expos: {stats.expos}</div>
        <div className="stat-card">Exhibitors: {stats.exhibitors}</div>
        <div className="stat-card">Attendees: {stats.attendees}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
