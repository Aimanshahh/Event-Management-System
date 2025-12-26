import React, { useEffect, useState } from 'react';
import { getMyRegistrations, getBookmarks } from '../../services/attendeeService';

const AttendeeDashboard = () => {
  const [stats, setStats] = useState({ registered: 0, bookmarks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const registrations = await getMyRegistrations();
        const bookmarks = await getBookmarks();
        setStats({
          registered: registrations.data.length,
          bookmarks: bookmarks.data.length
        });
      } catch (err) {
        console.error('Error fetching attendee stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="page">
      <h1>Attendee Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Registered Events</h3>
          <div className="stat-value">{stats.registered}</div>
        </div>
        <div className="stat-card">
          <h3>Bookmarked Sessions</h3>
          <div className="stat-value">{stats.bookmarks}</div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDashboard;
