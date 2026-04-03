import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminSignup } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const AdminSignup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await adminSignup({ name: form.name, email: form.email, password: form.password });
      if (res.data.success) {
        login(res.data.data);
        toast.success('Admin account created!');
        navigate('/admin/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.icon}>👨‍💼</div>
          <h2 style={styles.title}>Admin Registration</h2>
          <p style={styles.sub}>Create your admin account</p>
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Dr. John Smith" required
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="admin@anurag.edu.in" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Minimum 6 characters" required minLength={6}
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Re-enter password" required
              value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Creating account...' : '✅ Create Admin Account'}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account?{' '}
          <Link to="/admin/login" style={{ color: '#1a237e', fontWeight: 600 }}>Login here</Link>
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
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
  },
  card: {
    background: 'white', borderRadius: '20px', padding: '40px',
    width: '100%', maxWidth: '440px', boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  icon: { fontSize: '48px', marginBottom: '12px' },
  title: { fontSize: '24px', color: '#1a237e', marginBottom: '4px' },
  sub: { fontSize: '13px', color: '#8892b0' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  footer: { textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#5c6680' },
};

export default AdminSignup;
