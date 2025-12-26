import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService.JS';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Signup = () => {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth(); // for auto-login
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('attendee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup({ name, email, password, role });

      // Auto-login after signup
      const res = await loginContext({ email, password });
      const userRole = res?.user?.role;

      // Redirect based on role
      switch (userRole) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'exhibitor':
          navigate('/exhibitor/dashboard');
          break;
        case 'attendee':
          navigate('/attendee/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="input-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="attendee">Attendee</option>
            <option value="exhibitor">Exhibitor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Button type="submit" loading={loading}>Signup</Button>
      </form>
    </div>
  );
};

export default Signup;
