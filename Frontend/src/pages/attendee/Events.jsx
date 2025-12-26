import React, { useEffect, useState } from 'react';
import { getEvents } from '../../services/attendeeService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { formatDate } from '../../utils/helpers';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="page">
      <h1>Browse Events</h1>
      <div className="card-grid">
        {events.map(event => (
          <Card
            key={event._id}
            title={event.title}
            subtitle={`${formatDate(event.date)} • ${event.location}`}
            footer={<Button variant="primary">Register</Button>}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
