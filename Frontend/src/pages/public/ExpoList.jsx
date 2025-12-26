import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExpos } from '../../services/expoService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { formatDate } from '../../utils/helpers';

const ExpoList = () => {
  const navigate = useNavigate();
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await getExpos();
        setExpos(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpos();
  }, []);

  if (loading) return <div>Loading expos...</div>;

  return (
    <div className="page">
      <h1>Upcoming Expos</h1>
      <div className="card-grid">
        {expos.map(expo => (
          <Card
            key={expo._id}
            title={expo.title}
            subtitle={`${formatDate(expo.date)} • ${expo.location}`}
            description={expo.description}
            onClick={() => navigate(`/expos/${expo._id}`)}
            footer={<Button variant="primary">View Details</Button>}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpoList;
