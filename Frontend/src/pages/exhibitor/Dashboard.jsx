import React, { useEffect, useState } from 'react';
import { getMyExpos, viewAvailableBooths } from '../../services/exhibitorService';

const ExhibitorDashboard = () => {
  const [stats, setStats] = useState({ myExpos: 0, booths: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expos = await getMyExpos();
        const booths = await viewAvailableBooths(); // pass expoId if needed
        setStats({ myExpos: expos.data.length, booths: booths.data.length });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="page">
      <h1>Exhibitor Dashboard</h1>
      <div>My Expos: {stats.myExpos}</div>
      <div>Booths: {stats.booths}</div>
    </div>
  );
};

export default ExhibitorDashboard;
