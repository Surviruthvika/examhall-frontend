import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminLogin } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminLogin(form);
      if (res.data.success) {
        login(res.data.data);
        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>👨‍💼</div>
          <h2 style={styles.title}>Admin Login</h2>
          <p style={styles.sub}>Anurag University · Exam Hall Locator</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email" placeholder="admin@anurag.edu.in" required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password" placeholder="Enter your password" required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Logging in...' : '🔓 Login as Admin'}
          </button>
        </form>
        <p style={styles.footer}>
          Don't have an account?{' '}
          <Link to="/admin/signup" style={{ color: '#1a237e', fontWeight: 600 }}>Register here</Link>
        </p>
        <p style={styles.footer}>
          <Link to="/" style={{ color: '#8892b0', fontSize: '13px' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d1642, #1a237e)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '20px',
  },
  card: {
    background: 'white', borderRadius: '20px', padding: '40px',
    width: '100%', maxWidth: '420px',
    boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  icon: { fontSize: '48px', marginBottom: '12px' },
  title: { fontSize: '26px', color: '#1a237e', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#8892b0' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  footer: { textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#5c6680' },
};

export default AdminLogin;
