import React, { useState } from 'react';
import { registerForExpo } from '../../services/exhibitorService';
import Input from '../../components/Input';
import Button from '../../components/Button';

const RegisterExpo = () => {
  const [form, setForm] = useState({ expoId: '', boothPreference: '', company: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerForExpo(form);
      alert('Registered successfully');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="page">
      <h1>Register for Expo</h1>
      <form onSubmit={handleSubmit} className="form">
        <Input label="Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
        <Input label="Expo ID" value={form.expoId} onChange={e => setForm({ ...form, expoId: e.target.value })} required />
        <Input label="Booth Preference" value={form.boothPreference} onChange={e => setForm({ ...form, boothPreference: e.target.value })} />
        <Button type="submit">Submit Registration</Button>
      </form>
    </div>
  );
};

export default RegisterExpo;
