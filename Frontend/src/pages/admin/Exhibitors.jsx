import React, { useEffect, useState } from 'react';
import { getAllExhibitors } from '../../services/exhibitorService';
import Table from '../../components/Table';

const AdminExhibitors = () => {
  const [exhibitors, setExhibitors] = useState([]);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await getAllExhibitors();
        setExhibitors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExhibitors();
  }, []);

  const columns = [
    { key: 'company', label: 'Company' },
    { key: 'contact', label: 'Contact' },
    { key: 'booths', label: 'Booths' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div className="page">
      <h1>Exhibitor Management</h1>
      <Table columns={columns} data={exhibitors} />
    </div>
  );
};

export default AdminExhibitors;
