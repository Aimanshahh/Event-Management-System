import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpoById } from '../../services/expoService';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { formatDate } from '../../utils/helpers';

const ExpoDetails = () => {
  const { id } = useParams();
  const [expo, setExpo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpo = async () => {
      try {
        const res = await getExpoById(id);
        setExpo(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpo();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!expo) return <div>Expo not found</div>;

  return (
    <div className="page">
      <h1>{expo.title}</h1>
      <p>{expo.description}</p>
      <div>
        <span>📅 {formatDate(expo.date)}</span>
        <span>📍 {expo.location}</span>
      </div>
      <div className="expo-stats">
        <div><strong>{expo.exhibitors?.length || 0}</strong> Exhibitors</div>
        <div><strong>{expo.sessions?.length || 0}</strong> Sessions</div>
      </div>
      <Button variant="primary">Register as Attendee</Button>
    </div>
  );
};

export default ExpoDetails;
