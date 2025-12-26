import React, { useEffect, useState } from 'react';
import { getMyRegistrations } from '../../services/attendeeService';
import Card from '../../components/Card';
import { formatDate } from '../../utils/helpers';

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegs = async () => {
      try {
        const res = await getMyRegistrations();
        setRegistrations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRegs();
  }, []);

  return (
    <div className="page">
      <h1>My Registrations</h1>
      <div className="card-grid">
        {registrations.map(reg => (
          <Card
            key={reg._id}
            title={reg.expo}
            subtitle={`Registered: ${formatDate(reg.registeredOn)}`}
            description={`Status: ${reg.status}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRegistrations;
