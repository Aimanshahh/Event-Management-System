import React, { useEffect, useState } from 'react';
import { getBookmarks } from '../../services/attendeeService';
import Card from '../../components/Card';
import { formatDateTime } from '../../utils/helpers';

const SessionBookmark = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await getBookmarks();
        setBookmarks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div className="page">
      <h1>Bookmarked Sessions</h1>
      <div className="card-grid">
        {bookmarks.map(b => (
          <Card
            key={b._id}
            title={b.session}
            subtitle={b.expo}
            description={formatDateTime(b.time)}
          />
        ))}
      </div>
    </div>
  );
};

export default SessionBookmark;
