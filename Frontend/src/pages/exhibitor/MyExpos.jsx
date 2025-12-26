import React, { useEffect, useState } from 'react';
import { getMyExpos } from '../../services/exhibitorService';
import Card from '../../components/Card';

const MyExpos = () => {
  const [expos, setExpos] = useState([]);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await getMyExpos();
        setExpos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpos();
  }, []);

  return (
    <div className="page">
      <h1>My Registered Expos</h1>
      <div className="card-grid">
        {expos.map(expo => (
          <Card
            key={expo._id}
            title={expo.title}
            subtitle={`Booth: ${expo.booth || 'N/A'}`}
            description={`Status: ${expo.status}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyExpos;
