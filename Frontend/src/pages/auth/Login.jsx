import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // AuthContext login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password }); // AuthContext handles service + localStorage
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
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" loading={loading}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
