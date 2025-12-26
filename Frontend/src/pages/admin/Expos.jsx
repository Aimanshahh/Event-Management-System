import React, { useEffect, useState } from 'react';
import { getExpos } from '../../services/adminService';
import Table from '../../components/Table';
import Button from '../../components/Button';

const AdminExpos = () => {
  const [expos, setExpos] = useState([]);

  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await getExpos();
        setExpos(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpos();
  }, []);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date', render: row => new Date(row.date).toLocaleDateString() },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status' },
  ];

  const actions = [
    { label: 'Edit', variant: 'primary', onClick: expo => console.log('Edit', expo) },
    { label: 'Delete', variant: 'danger', onClick: expo => console.log('Delete', expo) }
  ];

  return (
    <div className="page">
      <h1>Expo Management</h1>
      <Button variant="primary" onClick={() => console.log('Create new expo')}>Create New Expo</Button>
      <Table columns={columns} data={expos} actions={actions} />
    </div>
  );
};

export default AdminExpos;
