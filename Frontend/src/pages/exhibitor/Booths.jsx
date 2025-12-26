import React, { useEffect, useState } from 'react';
import { viewAvailableBooths } from '../../services/exhibitorService';
import Card from '../../components/Card';

const Booths = () => {
  const [booths, setBooths] = useState([]);

  useEffect(() => {
    const fetchBooths = async () => {
      try {
        const res = await viewAvailableBooths(); // pass expoId if required
        setBooths(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooths();
  }, []);

  return (
    <div className="page">
      <h1>Available Booths</h1>
      <div className="card-grid">
        {booths.map(booth => (
          <Card
            key={booth._id}
            title={`Booth ${booth.name}`}
            subtitle={`Expo: ${booth.expo}`}
            description={`Size: ${booth.size} | Status: ${booth.status}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Booths;
